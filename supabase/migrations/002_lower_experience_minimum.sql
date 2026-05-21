-- Lower minimum experience requirement from 3 years to 1 year.
--
-- In production, years_of_experience is the enum type public.experience_range
-- (not a text+CHECK column), so we widen the enum itself. ADD VALUE ... BEFORE
-- keeps the natural ordering ('1-2' before '3-4').

alter type public.experience_range add value if not exists '1-2' before '3-4';

-- Drop the legacy text-column CHECK constraint if it still exists from older
-- deployments — harmless no-op on environments that already use the enum.
alter table public.creator_applications
  drop constraint if exists creator_applications_years_of_experience_check;
