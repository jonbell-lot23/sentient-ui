import React from "react";
export type IconProps = React.SVGProps<SVGSVGElement>;
export type NavItem = {
  id: string;
  label: string;
  Icon: (props: IconProps) => JSX.Element;
  color: string;
};

// Icons roughly matching Heroicons outline set
export const HomeIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12L12 3l9.75 9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5V21h5.25v-6h4.5v6H19.5V10.5" />
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
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5c2.485 0 4.5 1.12 4.5 2.5S14.485 9.5 12 9.5s-4.5-1.12-4.5-2.5S9.515 4.5 12 4.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.5c-2.485 0-4.5 1.12-4.5 2.5S9.515 19.5 12 19.5s4.5-1.12 4.5-2.5S14.485 14.5 12 14.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.5v5" />
  </svg>
);

export const UsersIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 14a4 4 0 00-8 0v2H4v2h16v-2h-4v-2z" />
    <circle cx="12" cy="8" r="3" />
  </svg>
);

export const CubeIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8l-9-5-9 5v8l9 5 9-5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.3 7l8.7 5 8.7-5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v10" />
  </svg>
);

export const DocumentIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 2v6h6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 6L16 1H8a2 2 0 00-2 2v18a2 2 0 002 2h8a2 2 0 002-2V6z" />
  </svg>
);

export const BellIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4a2 2 0 01-.6-1.4V10a7 7 0 10-14 0v4.2c0 .5-.2 1-.6 1.4L4 17h5m6 0a3 3 0 11-6 0m6 0H9" />
  </svg>
);

export const CogIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <circle cx="12" cy="12" r="3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a7.5 7.5 0 000-6l2.1-1.2-2-3.5-2.4 1a7.5 7.5 0 00-4.2-2.4l-.4-2.6h-4l-.4 2.6a7.5 7.5 0 00-4.2 2.4l-2.4-1-2 3.5 2.1 1.2a7.5 7.5 0 000 6l-2.1 1.2 2 3.5 2.4-1a7.5 7.5 0 004.2 2.4l.4 2.6h4l.4-2.6a7.5 7.5 0 004.2-2.4l2.4 1 2-3.5-2.1-1.2z" />
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
