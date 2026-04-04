# Security Review

Date: 2026-04-04

## Summary

This review identified high-risk issues in authentication, demo credential handling, and environment configuration exposure.

## Findings

1. Critical: `src/lib/supabase.ts` replaces the real Supabase client with a mock that always returns a fixed authenticated user and successful sign-in responses.
2. High: `src/pages/Login.tsx` hardcodes demo credentials and attempts to auto-create the demo account.
3. High: `.env` is tracked by git and `.gitignore` does not exclude it.
4. Medium: `src/contexts/AuthContext.tsx` performs client-side inserts into multiple tables, while the documented Supabase policies only cover `SELECT`.
5. Medium: `src/pages/Dashboard.tsx` silently falls back to mock data, which can hide auth and authorization failures.

## Recommended Actions

- Replace the mocked Supabase client with `createClient(...)` and validate real sessions.
- Remove demo credentials from the codebase and rotate exposed keys.
- Stop tracking `.env` and add environment files to `.gitignore`.
- Review and tighten Supabase RLS policies for `INSERT`, `UPDATE`, and `DELETE`.
- Surface backend/auth failures clearly instead of masking them with mock dashboard data.
