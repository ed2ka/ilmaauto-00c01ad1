

## Problem

The `Tabs` component uses `defaultValue` (uncontrolled mode) which means the tab state is only set on mount. Even with `key={activeTab}`, React may optimize and not fully remount when navigating between the same route with different query params. This causes the header dropdown links to not switch tabs correctly.

## Solution

Switch from uncontrolled (`defaultValue`) to controlled (`value` + `onValueChange`) Tabs in `src/pages/Dashboard.tsx`. This ensures the active tab always reflects the URL parameter, and clicking a tab on the page also updates the URL.

### Changes in `src/pages/Dashboard.tsx`

1. Import `useNavigate` from `react-router-dom`
2. Replace `defaultValue={activeTab} key={activeTab}` with `value={activeTab}`
3. Add `onValueChange` handler that updates the URL search params:
   ```typescript
   const navigate = useNavigate();
   
   const handleTabChange = (value: string) => {
     navigate(`/profil?tab=${value}`, { replace: true });
   };
   ```
4. Apply to Tabs: `<Tabs value={activeTab} onValueChange={handleTabChange}>`

This makes the tabs fully controlled by the URL, so header links and direct tab clicks both work consistently.
