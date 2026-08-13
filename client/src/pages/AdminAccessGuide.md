# Admin Access Guide for Awon Pharmacy

## How to Access the Admin Panel

1. **Go to the Admin Login**
   - Navigate to `/admin/login`
   - OR click "Admin Access" at the bottom of the sidebar in your user profile

2. **First-Time Setup (only when no admin exists)**
   - The server refuses to boot with the old default admin accounts.
   - When no admin account exists, the server writes a one-time setup token to
     `server/data/setup-admin.txt`.
   - Use the token on the setup screen to create the first admin account.
   - The token is deleted immediately after the first admin is created.

3. **Login with Admin Credentials**
   - Enter the email and password you set during setup.
   - Failed logins are rate-limited (10 per 15 minutes) and lock the IP after
     5 failures for 15 minutes.

4. **Navigate the Admin Dashboard**
   - After successful login, you'll be redirected to the admin dashboard.
   - Use the sidebar to navigate between admin sections:
     - Dashboard
     - Product Management
     - Marketing Tools
     - Analytics
     - AI Security
     - Security Events
     - WhatsApp Messages
     - User Requests
     - Delivery Management
     - Block List
     - Settings

5. **Logout**
   - Click the "Logout" button in the top-right corner of any admin page.

## Security Notes

- The admin panel is completely separate from the public website.
- Admin login is not accessible from the main navigation.
- Admin sessions expire after 24 hours (JWT).
- All login attempts, lockouts, order events, and honeypot triggers are logged
  to `server/data/security-events.log` and visible in the in-app
  Security Events screen.
