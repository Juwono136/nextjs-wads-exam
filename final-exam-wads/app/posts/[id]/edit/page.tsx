import { notFound, redirect } from "next/navigation";
import { Header } from "@/components/layout/header";
import { PostForm } from "@/components/posts/post-form";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: PageProps) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }

  const { id } = await params;
  const post = await prisma.post.findFirst({
    where: { id, authorId: session.user.id },
  });

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header userName={session.user.name} />
      <main className="mx-auto max-w-2xl flex-1 px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">Edit Post</h1>
        <PostForm
          postId={post.id}
          initialTitle={post.title}
          initialContent={post.content}
          initialPublished={post.published}
        />
      </main>
    </>
  );
}
