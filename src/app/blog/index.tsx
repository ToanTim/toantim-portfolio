import Link from "next/link";
import { ROUTES } from "../../router";

const posts = [
  { id: "1", title: "My first blog post" },
  { id: "2", title: "Another blog post" },
];

export default function Blog() {
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={ROUTES.BLOG_POST(post.id)}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <Link href={ROUTES.HOME}>Go back home</Link>
    </div>
  );
}
