import { Outlet } from "@remix-run/react";
import { type LoaderArgs, redirect } from "@remix-run/server-runtime";
import { getUserSession } from "~/utils/session.server";

export async function loader({ request }: LoaderArgs) {
  const sessionUser = await getUserSession(request);
  if (!sessionUser) {
    return redirect("/login");
  }
  return null;
}

export default function AppLayout() {
  return (
    <>
      {/* TBD */}
      <Outlet />
    </>
  );
}
