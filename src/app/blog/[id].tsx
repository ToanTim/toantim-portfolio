import { useRouter } from "next/router";
import Link from "next/link";
import { ROUTES } from "../../router";

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Blog Post {id}</h1>
      <p>This is the blog post content for post id {id}.</p>
      <Link href={ROUTES.BLOG}>Back to Blog</Link>
    </div>
  );
}
