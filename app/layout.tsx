import "./globals.css";
import { NavProvider } from "./nav-context";
import { SideNav } from "./components/SideNav";
import { TopBar } from "./components/TopBar";
import { HamburgerNavProvider } from "./hamburger-nav-context";
import { ThemeProvider } from "./theme-context";
import { UnifiedCustomize } from "./components/UnifiedCustomize";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <ThemeProvider>
          <NavProvider>
            <HamburgerNavProvider>
              <TopBar />
              <div className="flex flex-1">
                <SideNav />
                <main className="flex-1 p-6">{children}</main>
              </div>
              <UnifiedCustomize />
            </HamburgerNavProvider>
          </NavProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
