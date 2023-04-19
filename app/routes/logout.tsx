import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { signOut } from "~/utils/session.server";

export async function action({ request }: ActionArgs) {
  return signOut(request);
}

export async function loader() {
  return redirect("/");
}
