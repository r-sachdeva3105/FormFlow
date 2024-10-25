import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { UserButton } from "@clerk/nextjs";
// import Link from "next/link";
import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen max-h-screen min-w-full bg-background">
      <nav className="flex justify-between items-center border-b border-border px-8 py-4">
        <Logo />
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
      <main className="w-full px-16 py-8">{children}</main>
    </div>
  );
}

export default Layout;
