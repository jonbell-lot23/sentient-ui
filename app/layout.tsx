import "./globals.css";
import { NavProvider } from "./nav-context";
import { SideNav } from "./components/SideNav";
import { TopBar } from "./components/TopBar";
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
            <div className="flex-1 flex flex-col">
              <TopBar />
              <main className="flex-1 p-6">{children}</main>
            </div>
          </NavProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
