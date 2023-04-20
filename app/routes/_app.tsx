import { Grid, View } from "@adobe/react-spectrum";
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
      <Grid
        areas={["header", "content", "footer"]}
        rows={["size-1000", "auto", "size-1000"]}
        gap="size-100"
      >
        <View backgroundColor="celery-600" gridArea="header" />
        <View backgroundColor="blue-600" padding="size-1000" gridArea="content">
          <Outlet />
        </View>
        <View backgroundColor="magenta-600" gridArea="footer" />
      </Grid>
    </>
  );
}
