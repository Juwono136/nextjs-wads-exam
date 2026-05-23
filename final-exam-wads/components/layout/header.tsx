import Link from "next/link";
import { Button } from "@/components/ui/button";

type HeaderProps = {
  userName?: string | null;
};

export function Header({ userName }: HeaderProps) {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <Link href="/" className="font-semibold text-lg">
          Simple Blog
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          <Link href="/posts" className="hover:underline">
            My Posts
          </Link>
          {userName ? (
            <span className="text-muted-foreground">Hi, {userName}</span>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
