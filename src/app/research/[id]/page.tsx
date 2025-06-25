"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ROUTES } from "../../../router";

interface BlogPostPageProps {
  params: { id: string };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const router = useRouter();
  const { id } = params;

  return (
    <div>
      <h1>Blog Post {id}</h1>
      <p>This is the blog post content for post id {id}.</p>
      <button onClick={() => router.push(ROUTES.BLOG)}>Back to Blog</button>
      <Link href={ROUTES.BLOG}>Back to Blog</Link>
    </div>
  );
}
