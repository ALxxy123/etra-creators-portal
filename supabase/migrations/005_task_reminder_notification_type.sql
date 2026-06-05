-- Allows the portal to log reminder emails sent for assessment task delivery.
-- Production uses public.email_notification_type as an enum, while the local
-- baseline migration keeps notification_type as text.

do $$
begin
  if exists (
    select 1
    from pg_type t
    join pg_namespace n on n.oid = t.typnamespace
    where n.nspname = 'public'
      and t.typname = 'email_notification_type'
  ) then
    alter type public.email_notification_type add value if not exists 'task_reminder';
  end if;
end $$;
