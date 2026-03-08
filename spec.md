# Digital Marketing Portfolio

## Current State
The app has a Motoko backend with a `submitInquiry` function and a `getAllInquiries` query. The frontend has a contact form but no way to view submitted inquiries.

## Requested Changes (Diff)

### Add
- An admin/submissions page accessible via a hidden route (e.g. `/admin`) that calls `getAllInquiries()` and lists all contact form submissions in a table: Name, Email, Message, Date submitted.

### Modify
- Nothing in the backend — `getAllInquiries` already exists.

### Remove
- Nothing.

## Implementation Plan
1. Add a `/admin` route in the React app (React Router or simple state-based routing).
2. Create an `AdminPage` component that calls `getAllInquiries()` on mount.
3. Display results in a clean table with columns: Name, Email, Message, Date.
4. Show a loading state while fetching and an empty state if no submissions exist.
5. Keep the page accessible without authentication (no login required per current backend design).
