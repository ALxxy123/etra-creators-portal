-- The admin app writes to application_status_history directly in its PATCH
-- handler (etra-admin/src/app/api/applications/[id]/route.ts) with the real
-- admin userId and the optional change_reason. The DB-level trigger was
-- duplicating every status change with a NULL changed_by (auth.uid() is NULL
-- under the service-role context) and no reason. Drop the trigger so the
-- admin route is the single writer.

drop trigger if exists record_application_status_change on public.creator_applications;
drop function if exists public.record_application_status_change();
