import { getDb } from "./connection";
import { newsletterSubscribers, contactSubmissions } from "@db/schema";

/** Insert a subscriber. Returns true if newly inserted, false if already on the list. */
export async function addSubscriber(email: string): Promise<boolean> {
  const db = getDb();
  const existing = await db.query.newsletterSubscribers.findFirst({
    where: (t, { eq }) => eq(t.email, email),
  });
  if (existing) return false;
  await db.insert(newsletterSubscribers).values({ email });
  return true;
}

export async function addContactSubmission(input: {
  name: string;
  email: string;
  type: "demo" | "booking" | "press" | "general";
  message: string;
}): Promise<void> {
  const db = getDb();
  await db.insert(contactSubmissions).values(input);
}
