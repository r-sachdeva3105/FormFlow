import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  // return <SignIn />;
  return (
    <div className="flex flex-col h-screen min-w-full bg-background">
      <nav className="flex justify-between items-center border-b border-border px-8 py-4">
        <Logo />
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
        </div>
      </nav>
      <main className="w-full h-full flex items-center justify-center">
        <SignIn />
      </main>
    </div>
  );
}
