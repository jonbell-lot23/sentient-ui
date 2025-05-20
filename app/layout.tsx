import "./globals.css";
import { NavProvider } from "./nav-context";
import { SideNav } from "./components/SideNav";
import { ThemeProvider } from "./theme-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex">
        <ThemeProvider>
          <NavProvider>
            <SideNav />
            <main className="flex-1 p-6">{children}</main>
          </NavProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
