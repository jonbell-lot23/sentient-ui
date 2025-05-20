import React from "react";
export type IconProps = React.SVGProps<SVGSVGElement>;
export type NavItem = {
  id: string;
  label: string;
  Icon: (props: IconProps) => JSX.Element;
  color: string;
};

// Simple SVG icons inspired by Heroicons
export const HomeIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5V20h6v-6h3v6h6v-9.5" />
  </svg>
);

export const ChartBarIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V9m4 8V5m4 8v-4" />
  </svg>
);

export const CurrencyIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m-6-9h12" />
  </svg>
);

export const UsersIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <circle cx="9" cy="8" r="3" />
    <circle cx="15" cy="8" r="3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 21c0-3.5 5-6 7-6s7 2.5 7 6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 15c2 0 5 1.5 5 4" />
  </svg>
);

export const CubeIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l8 4v8l-8 4-8-4V6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22V12" />
  </svg>
);

export const DocumentIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 2h9l5 5v15H6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v6h6" />
  </svg>
);

export const BellIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22a2 2 0 002-2H10a2 2 0 002 2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 16V9a6 6 0 10-12 0v7L4 18h16l-2-2z" />
  </svg>
);

export const CogIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <circle cx="12" cy="12" r="3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a7.5 7.5 0 000-6l2.1-1.2-2-3.5-2.4 1a7.5 7.5 0 00-4.2-2.4l-.4-2.6h-4l-.4 2.6a7.5 7.5 0 00-4.2 2.4l-2.4-1-2 3.5 2.1 1.2a7.5 7.5 0 000 6L2.1 16.2l2 3.5 2.4-1a7.5 7.5 0 004.2 2.4l.4 2.6h4l.4-2.6a7.5 7.5 0 004.2-2.4l2.4 1 2-3.5-2.1-1.2z" />
  </svg>
);

export const defaultNav: NavItem[] = [
  { id: "dashboard", label: "Dashboard", Icon: HomeIcon, color: "bg-blue-600 text-white" },
  { id: "analytics", label: "Analytics", Icon: ChartBarIcon, color: "bg-purple-600 text-white" },
  { id: "sales", label: "Sales", Icon: CurrencyIcon, color: "bg-green-600 text-white" },
  { id: "customers", label: "Customers", Icon: UsersIcon, color: "bg-yellow-500 text-white" },
  { id: "products", label: "Products", Icon: CubeIcon, color: "bg-red-500 text-white" },
  { id: "reports", label: "Reports", Icon: DocumentIcon, color: "bg-indigo-600 text-white" },
  { id: "notifications", label: "Notifications", Icon: BellIcon, color: "bg-pink-600 text-white" },
  { id: "settings", label: "Settings", Icon: CogIcon, color: "bg-gray-700 text-white" },
];
