import React from "react";
import {
  Home,
  BarChart,
  DollarSign,
  Users,
  Package,
  FileText,
  Bell,
  Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type IconProps = React.ComponentProps<"svg">;
export type NavItem = {
  id: string;
  label: string;
  Icon: LucideIcon;
  color: string;
};

export const defaultNav: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    Icon: Home,
    color: "bg-blue-600 text-white",
  },
  {
    id: "analytics",
    label: "Analytics",
    Icon: BarChart,
    color: "bg-purple-600 text-white",
  },
  {
    id: "sales",
    label: "Sales",
    Icon: DollarSign,
    color: "bg-green-600 text-white",
  },
  {
    id: "customers",
    label: "Customers",
    Icon: Users,
    color: "bg-yellow-500 text-white",
  },
  {
    id: "products",
    label: "Products",
    Icon: Package,
    color: "bg-red-500 text-white",
  },
  {
    id: "reports",
    label: "Reports",
    Icon: FileText,
    color: "bg-indigo-600 text-white",
  },
  {
    id: "notifications",
    label: "Notifications",
    Icon: Bell,
    color: "bg-pink-600 text-white",
  },
  {
    id: "settings",
    label: "Settings",
    Icon: Settings,
    color: "bg-gray-700 text-white",
  },
];
