import { Button, Flex, Form, View } from "@adobe/react-spectrum";
import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Link,
  useNavigation,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zx } from "zodix";
import { z } from "zod";

import { safeRedirect } from "~/utils";
import { signUp } from "~/utils/auth.server";
import { getUserSession, createUserSession } from "~/utils/session.server";
import { TextControl } from "~/components/form/TextControl";

const joinFormSchema = z.object({
  email: z.string().email().min(1, "Email is invalid"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password is too short"),
});

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserSession(request);
  if (userId) return redirect("/");
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  const { email, password } = await zx.parseForm(formData, joinFormSchema);

  const { user } = await signUp(email, password);
  const idToken = await user.getIdToken();

  return createUserSession(idToken, redirectTo);
}

export const meta: V2_MetaFunction = () => [{ title: "Sign Up" }];

export default function JoinPage() {
  const [searchParams] = useSearchParams();
  const methods = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(joinFormSchema),
  });
  const submit = useSubmit();
  const { state } = useNavigation();

  const redirectTo = searchParams.get("redirectTo") ?? undefined;

  return (
    <Flex minHeight="100%" direction="column" justifyContent="center">
      <View
        marginX="auto"
        width="100%"
        maxWidth={{ M: "100%" }}
        paddingX="size-100"
      >
        <FormProvider {...methods}>
          <Form
            labelPosition="top"
            labelAlign="start"
            method="post"
            maxWidth="size-3600"
            onSubmit={methods.handleSubmit((_, event) =>
              submit(event?.target, { replace: true })
            )}
          >
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <TextControl name="email" label="Email Address" type="email" />
            <TextControl name="password" label="Password" type="password" />
            <Button variant="primary" type="submit">
              {state === "idle" ? "Create Account" : "Submitting..."}
            </Button>
            <div>
              Already have an account?{" "}
              <Link
                className="text-blue-500 underline"
                to={{
                  pathname: "/login",
                  search: searchParams.toString(),
                }}
              >
                Log in
              </Link>
            </div>
          </Form>
        </FormProvider>
      </View>
    </Flex>
  );
}
