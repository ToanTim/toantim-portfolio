import Link from "next/link";
import { ROUTES } from "../router";

export default function Contact() {
  return (
    <div>
      <h1>Contact Page</h1>
      <p>Contact us at contact@example.com</p>
      <Link href={ROUTES.HOME}>Go back home</Link>
    </div>
  );
}
