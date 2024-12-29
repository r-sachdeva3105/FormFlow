import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen min-w-full bg-background">
      <nav className="flex justify-between items-center border-b border-border px-8 py-4">
        <Logo />
        <ThemeSwitcher />
      </nav>
      <main className="w-full">{children}</main>
    </div>
  );
}

export default Layout;
