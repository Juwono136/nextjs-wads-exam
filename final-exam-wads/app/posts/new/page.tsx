import { redirect } from "next/navigation";
import { Header } from "@/components/layout/header";
import { PostForm } from "@/components/posts/post-form";
import { getSession } from "@/lib/session";

export default async function NewPostPage() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login?callbackUrl=/posts/new");
  }

  return (
    <>
      <Header userName={session.user.name} />
      <main className="mx-auto max-w-2xl flex-1 px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">Create Post</h1>
        <PostForm />
      </main>
    </>
  );
}
