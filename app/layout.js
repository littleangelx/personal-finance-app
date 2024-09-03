import { Public_Sans } from "next/font/google";
import "./globals.css";
import DesktopNav from "@/components/DesktopNav";
import { SidebarProvider } from "@/context/sidebarWidth";
import SmallScreenNav from "@/components/SmallScreenNav";

const publicSans = Public_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Personal Finance App",
  description: "Coded by Rachel Kirkland",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SidebarProvider>
        <body className={publicSans.className}>
          <div className=" bg-beige-100">
            <div className="w-screen hidden xl:flex">
              <DesktopNav />
            </div>
            <div className="w-screen block xl:hidden">
              <SmallScreenNav />
            </div>
            <div className="bg-beige-100">{children}</div>
          </div>
        </body>
      </SidebarProvider>
    </html>
  );
}
