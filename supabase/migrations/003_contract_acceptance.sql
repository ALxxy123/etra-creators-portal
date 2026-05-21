-- Adds contract acceptance evidence to creator_applications.
--
-- The applicant electronically signs the binding contract on the terms page;
-- we store the version of the contract they accepted, the precise timestamp,
-- their IP address, their user agent, and a JSON snapshot of the article
-- text — so admins can always reproduce exactly what each applicant agreed
-- to, even if the live contract text changes later.
--
-- contract_sent_at is populated by the admin-hooks webhook the first time
-- the signed contract email is delivered to the applicant after acceptance.

alter table public.creator_applications
  add column if not exists contract_version text,
  add column if not exists contract_accepted_at timestamptz,
  add column if not exists contract_acceptance_ip text,
  add column if not exists contract_acceptance_user_agent text,
  add column if not exists contract_snapshot jsonb,
  add column if not exists contract_sent_at timestamptz;

create index if not exists creator_applications_contract_version_idx
  on public.creator_applications(contract_version);

-- The email_notifications.notification_type enum (introduced in the
-- production schema) needs to accept the new 'contract_copy' type emitted
-- by sendContractCopyEmail() in lib/emails/send.ts.
alter type public.email_notification_type add value if not exists 'contract_copy';
