

## Problem: RLS blokira INSERT u `part_inquiries`

Iz network logova vidim da insert u `part_inquiries` vraća **401** sa greškom `"new row violates row-level security policy"`. Razlog: RLS polisa "Anyone can create inquiry" je kreirana kao **RESTRICTIVE** umjesto **PERMISSIVE**. Restrictive polise bez barem jedne permissive polise blokiraju sve.

Isti problem vjerovatno postoji i za SELECT polisu.

### Izmjene

1. **DB migracija** - Dropati obje postojeće RLS polise i ponovo ih kreirati kao PERMISSIVE:

```sql
DROP POLICY IF EXISTS "Anyone can create inquiry" ON public.part_inquiries;
DROP POLICY IF EXISTS "Users can view own inquiries" ON public.part_inquiries;

CREATE POLICY "Anyone can create inquiry"
  ON public.part_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view own inquiries"
  ON public.part_inquiries FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());
```

Ovo je jedina potrebna izmjena. Kod (`NoResultsInquiry`, `useInquiries`, `Auth` claim logika) je ispravan - samo RLS polise trebaju biti permissive.

