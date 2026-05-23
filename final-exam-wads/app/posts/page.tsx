import Link from "next/link";
import { redirect } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function PostsPage() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login?callbackUrl=/posts");
  }

  const posts = await prisma.post.findMany({
    where: { authorId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Header userName={session.user.name} />
      <main className="mx-auto max-w-4xl flex-1 px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Posts</h1>
          <Link href="/posts/new">
            <Button>New Post</Button>
          </Link>
        </div>
        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet. Create your first post.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.id} className="rounded-lg border p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-semibold">{post.title}</h2>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {post.content}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {post.published ? "Published" : "Draft"} ·{" "}
                      {post.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <Link href={`/posts/${post.id}/edit`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
