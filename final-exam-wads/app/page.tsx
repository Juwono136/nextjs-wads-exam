import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session";

export default async function HomePage() {
  const session = await getSession();

  return (
    <>
      <Header userName={session?.user.name} />
      <main className="mx-auto max-w-4xl flex-1 px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight">
          Simple Blog — WADS Final Exam
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          A full-stack blog application built with Next.js, Better Auth,
          PostgreSQL, Prisma, REST APIs, Swagger, Docker, and local Ollama AI.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {session?.user ? (
            <Link href="/posts">
              <Button>Go to My Posts</Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button>Login</Button>
              </Link>
              <Link href="/register">
                <Button variant="outline">Register</Button>
              </Link>
            </>
          )}
          {/* EXAM Q2: wrong path — correct path is /api/docs */}
          {process.env.NEXT_PUBLIC_API_DOCS_ENABLED === "true" && (
            <Link href="/api/doc">
              <Button variant="secondary">API Docs (Swagger)</Button>
            </Link>
          )}
        </div>
      </main>
    </>
  );
}
