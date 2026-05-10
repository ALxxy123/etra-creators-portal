-- ETRA Creators Portal baseline schema.
-- Run this in Supabase SQL editor or through the Supabase CLI.

create extension if not exists pgcrypto;

create or replace function public.generate_tracking_code()
returns text
language plpgsql
as $$
declare
  generated_code text;
begin
  loop
    generated_code := 'ETRA-' || to_char(now(), 'YYYY') || '-' ||
      upper(substr(md5(random()::text || clock_timestamp()::text), 1, 8));

    exit when not exists (
      select 1 from public.creator_applications
      where tracking_code = generated_code
    );
  end loop;

  return generated_code;
end;
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.creator_applications (
  id uuid primary key default gen_random_uuid(),
  tracking_code text not null unique default public.generate_tracking_code(),
  full_name text not null,
  email text not null,
  phone text not null,
  city text not null,
  specialty text not null check (specialty in ('mobile', 'uiux', 'frontend', 'backend', 'fullstack')),
  level text not null check (level in ('mid', 'senior')),
  years_of_experience text not null check (years_of_experience in ('1-2', '3-4', '5-7', '8-10', '10+')),
  linkedin_or_github_url text not null,
  portfolio_url text,
  cv_file_path text,
  bio text,
  criteria_acknowledged jsonb not null,
  terms_acknowledged boolean not null default false,
  terms_acknowledged_at timestamptz,
  status text not null default 'new' check (status in ('new', 'under_review', 'accepted', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.application_status_history (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.creator_applications(id) on delete cascade,
  previous_status text check (previous_status is null or previous_status in ('new', 'under_review', 'accepted', 'rejected')),
  new_status text not null check (new_status in ('new', 'under_review', 'accepted', 'rejected')),
  changed_by uuid references auth.users(id) on delete set null,
  change_reason text,
  changed_at timestamptz not null default now()
);

create table if not exists public.application_notes (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.creator_applications(id) on delete cascade,
  note_text text not null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'reviewer' check (role in ('admin', 'reviewer')),
  created_at timestamptz not null default now()
);

create table if not exists public.platform_settings (
  key text primary key check (key in ('allow_registrations', 'email_notifications')),
  value boolean not null,
  updated_at timestamptz not null default now()
);

insert into public.platform_settings (key, value)
values
  ('allow_registrations', true),
  ('email_notifications', true)
on conflict (key) do nothing;

create table if not exists public.email_notifications (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.creator_applications(id) on delete cascade,
  notification_type text not null,
  recipient_email text not null,
  recipient_name text not null,
  status text not null check (status in ('sent', 'failed')),
  sent_at timestamptz,
  error_message text,
  created_at timestamptz not null default now()
);

create index if not exists creator_applications_status_idx on public.creator_applications(status);
create index if not exists creator_applications_specialty_idx on public.creator_applications(specialty);
create index if not exists creator_applications_created_at_idx on public.creator_applications(created_at desc);
create index if not exists creator_applications_tracking_code_idx on public.creator_applications(tracking_code);
create index if not exists application_notes_application_id_idx on public.application_notes(application_id);

drop trigger if exists set_creator_applications_updated_at on public.creator_applications;
create trigger set_creator_applications_updated_at
before update on public.creator_applications
for each row execute function public.set_updated_at();

drop trigger if exists set_application_notes_updated_at on public.application_notes;
create trigger set_application_notes_updated_at
before update on public.application_notes
for each row execute function public.set_updated_at();

create or replace function public.record_application_status_change()
returns trigger
language plpgsql
as $$
begin
  if old.status is distinct from new.status then
    insert into public.application_status_history (
      application_id,
      previous_status,
      new_status,
      changed_by
    )
    values (
      new.id,
      old.status,
      new.status,
      auth.uid()
    );
  end if;

  return new;
end;
$$;

drop trigger if exists record_application_status_change on public.creator_applications;
create trigger record_application_status_change
after update of status on public.creator_applications
for each row execute function public.record_application_status_change();

create or replace view public.application_stats as
select
  count(*)::int as total,
  count(*) filter (where status = 'new')::int as new,
  count(*) filter (where status = 'under_review')::int as under_review,
  count(*) filter (where status = 'accepted')::int as accepted,
  count(*) filter (where status = 'rejected')::int as rejected
from public.creator_applications;

create or replace function public.check_application_status(tracking_code text)
returns table (
  tracking_code text,
  full_name text,
  specialty text,
  status text,
  submission_date timestamptz
)
language sql
security definer
set search_path = public
as $$
  select
    creator_applications.tracking_code,
    creator_applications.full_name,
    creator_applications.specialty,
    creator_applications.status,
    creator_applications.created_at as submission_date
  from public.creator_applications
  where creator_applications.tracking_code = upper(trim($1))
  limit 1;
$$;

alter table public.creator_applications enable row level security;
alter table public.application_status_history enable row level security;
alter table public.application_notes enable row level security;
alter table public.admin_users enable row level security;
alter table public.platform_settings enable row level security;
alter table public.email_notifications enable row level security;

drop policy if exists "Admins can read own role" on public.admin_users;
create policy "Admins can read own role"
on public.admin_users
for select
to authenticated
using (user_id = auth.uid());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('creator-cvs', 'creator-cvs', false, 5242880, array['application/pdf'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
