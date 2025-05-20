import "./globals.css";
import { NavProvider } from "./nav-context";
import { SideNav } from "./components/SideNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex">
        <NavProvider>
          <SideNav />
          <main className="flex-1 p-6">{children}</main>
        </NavProvider>
      </body>
    </html>
  );
}
