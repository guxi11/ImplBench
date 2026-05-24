---
title: "Add Feedback nav item to Sidebar"
status: pending
next: null
type: task
description: "Task: Add Feedback nav item to Sidebar (plan: user-feedback-module)"
---

# Add Feedback nav item to Sidebar

File: `src/components/Sidebar.tsx`

Add to `navItems` array after Users entry:
```ts
{ href: "/feedback", label: "Feedback", icon: "💬" }
```

Update pathname matching: change active check from `pathname === href` to `pathname === href || (href !== '/' && pathname.startsWith(href))` so /feedback/fb-001 highlights Feedback nav.
