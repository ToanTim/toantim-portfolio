import Link from "next/link";
import { ROUTES } from "../router";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li>
            <Link href={ROUTES.ABOUT}>About</Link>
          </li>
          <li>
            <Link href={ROUTES.CONTACT}>Contact</Link>
          </li>
          <li>
            <Link href={ROUTES.BLOG}>Blog</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
