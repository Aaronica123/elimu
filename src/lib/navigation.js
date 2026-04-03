import {
    LayoutDashboard,
    Users,
    GraduationCap,
    BookOpen,
    ClipboardList,
    Brain,
    BarChart3,
    Shield,
    ScrollText,
    UserPlus,
  } from "lucide-react";
  
  // Navigation items for the app
  export const NAV_ITEMS = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      roles: ["TEACHER", "SENIOR_TEACHER", "DEPUTY_PRINCIPAL", "PRINCIPAL", "IT_HANDLER", "ADMIN", "PARENT"],
    },
    {
      label: "Students",
      path: "/students",
      icon: GraduationCap,
      roles: ["TEACHER", "SENIOR_TEACHER", "DEPUTY_PRINCIPAL", "PRINCIPAL", "IT_HANDLER", "ADMIN"],
    },
    {
      label: "Subjects",
      path: "/subjects",
      icon: BookOpen,
      roles: ["TEACHER", "SENIOR_TEACHER", "DEPUTY_PRINCIPAL", "PRINCIPAL", "ADMIN", "IT_HANDLER"],
    },
    {
      label: "Marks Entry",
      path: "/marks",
      icon: ClipboardList,
      roles: ["TEACHER"],
    },
    {
      label: "View Marks",
      path: "/marks/view",
      icon: ClipboardList,
      roles: ["TEACHER", "SENIOR_TEACHER", "PRINCIPAL"],
    },
    {
      label: "AI Analysis",
      path: "/ai-analysis",
      icon: Brain,
      roles: ["TEACHER", "SENIOR_TEACHER", "PRINCIPAL", "PARENT"],
    },
    {
      label: "Reports",
      path: "/reports",
      icon: BarChart3,
      roles: ["TEACHER", "SENIOR_TEACHER", "DEPUTY_PRINCIPAL", "PRINCIPAL"],
    },
    {
      label: "Register Users",
      path: "/register-users",
      icon: UserPlus,
      roles: ["IT_HANDLER"],
    },
    {
      label: "User Management",
      path: "/user-management",
      icon: Users,
      roles: ["ADMIN"],
    },
    {
      label: "Role Management",
      path: "/role-management",
      icon: Shield,
      roles: ["ADMIN"],
    },
    {
      label: "Audit Logs",
      path: "/audit-logs",
      icon: ScrollText,
      roles: ["ADMIN"],
    },
    {
      label: "My Child",
      path: "/my-child",
      icon: GraduationCap,
      roles: ["PARENT"],
    },
  ];
  
  // Function to get navigation items for a specific role
  export function getNavForRole(role) {
    return NAV_ITEMS.filter((item) => item.roles.includes(role));
  }