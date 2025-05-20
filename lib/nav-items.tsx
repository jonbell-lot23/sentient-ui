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
  File,
  Folder,
  Calendar,
  Bookmark,
  Star,
  Globe,
  Cloud,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type IconProps = React.ComponentProps<"svg">;
export type NavItem = {
  id: string;
  label: string;
  Icon: LucideIcon;
  color: string;
};

export const defaultSideNav: NavItem[] = [
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

export const defaultHamburgerNav: NavItem[] = [
  {
    id: "item1",
    label: "Item 1",
    Icon: File,
    color: "bg-gray-200 text-gray-900",
  },
  {
    id: "item2",
    label: "Item 2",
    Icon: Folder,
    color: "bg-gray-200 text-gray-900",
  },
  {
    id: "item3",
    label: "Item 3",
    Icon: Calendar,
    color: "bg-gray-200 text-gray-900",
  },
  {
    id: "item4",
    label: "Item 4",
    Icon: Bookmark,
    color: "bg-gray-200 text-gray-900",
  },
  {
    id: "item5",
    label: "Item 5",
    Icon: Star,
    color: "bg-gray-200 text-gray-900",
  },
  {
    id: "item6",
    label: "Item 6",
    Icon: Globe,
    color: "bg-gray-200 text-gray-900",
  },
  {
    id: "item7",
    label: "Item 7",
    Icon: Cloud,
    color: "bg-gray-200 text-gray-900",
  },
];
