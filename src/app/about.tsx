import Link from "next/link";
import { ROUTES } from "../router";

export default function About() {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the about page.</p>
      <Link href={ROUTES.HOME}>Go back home</Link>
    </div>
  );
}
