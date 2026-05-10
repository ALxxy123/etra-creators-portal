-- Lower minimum experience requirement from 3 years to 1 year
-- Adds new bracket '1-2' to the years_of_experience check constraint

alter table public.creator_applications
  drop constraint if exists creator_applications_years_of_experience_check;

alter table public.creator_applications
  add constraint creator_applications_years_of_experience_check
  check (years_of_experience in ('1-2', '3-4', '5-7', '8-10', '10+'));
