-- ============================================================================
-- Migration: 0002_add_currency_to_solution_requests.sql
-- Adds currency tracking to solution_requests table
-- ============================================================================

alter table solution_requests
  add column if not exists budget_currency text default 'INR',
  add column if not exists currency text default 'INR';
