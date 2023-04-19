import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Link as RouterLink,
  useNavigation,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import { Button, Flex, Form, View, Link, Text } from "@adobe/react-spectrum";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { zx } from "zodix";
import { z } from "zod";

import { safeRedirect } from "~/utils";
import { signIn } from "~/utils/auth.server";
import { createUserSession, getUserSession } from "~/utils/session.server";
import { TextControl } from "~/components/form/TextControl";
import { CheckboxControl } from "~/components/form/CheckboxControl";

const loginFormSchema = z.object({
  email: z.string().email().min(1, "Email is invalid"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password is too short"),
  remember: z.enum(["default", "on"]),
});

export async function loader({ request }: LoaderArgs) {
  const sessionUser = await getUserSession(request);
  if (sessionUser) return redirect("/");
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/notes");

  const { email, password, remember } = await zx.parseForm(
    formData,
    loginFormSchema
  );

  const { user } = await signIn(email, password);

  return createUserSession({
    idToken: await user.getIdToken(),
    redirectTo,
    remember: remember === "on",
  });
}

export const meta: V2_MetaFunction = () => [{ title: "Login" }];

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const methods = useForm({
    defaultValues: { email: "", password: "", remember: "default" },
    resolver: zodResolver(loginFormSchema),
  });
  const submit = useSubmit();
  const { state } = useNavigation();

  const redirectTo = searchParams.get("redirectTo") || "/cards";

  return (
    <Flex
      minHeight="100%"
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap="size-100"
    >
      <FormProvider {...methods}>
        <Form
          labelPosition="top"
          labelAlign="start"
          method="post"
          width="size-5000"
          onSubmit={methods.handleSubmit((_, event) =>
            submit(event?.target, { replace: true })
          )}
        >
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <TextControl name="email" label="Email Address" type="email" />
          <TextControl name="password" label="Password" type="password" />
          <Button variant="primary" type="submit">
            {state === "submitting" ? "Submitting..." : "Login"}
          </Button>
          <Flex alignItems="center" direction="column">
            <CheckboxControl name="remember">Remember me</CheckboxControl>
            <View>
              <Text>Don't have an account?</Text>{" "}
              <Link>
                <RouterLink
                  className="text-blue-500 underline"
                  to={{
                    pathname: "/join",
                    search: searchParams.toString(),
                  }}
                >
                  Sign up
                </RouterLink>
              </Link>
            </View>
          </Flex>
        </Form>
      </FormProvider>
    </Flex>
  );
}
