import { useForm } from "@tanstack/react-form";
import { Link, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { z } from "zod";
import { Button } from "../components/Button";
import { Field } from "../components/Field";
import { Input } from "../components/Input";
import { useAuth } from "../hooks/useAuth";
import { Container } from "../layouts/Container";

const signInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function SignInPage() {
  const { signIn, isSignInPending, signInError, isAuthenticated } = useAuth();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: signInSchema,
    },
    onSubmit: async ({ value }) => {
      signIn(value);
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, router]);

  return (
    <Container.Root>
      <Container.Content className="justify-center">
        <div>
          <h1 className="text-3xl text-center font-bold text-green-600">
            SkillMatch
          </h1>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="space-y-4">
            <form.Field name="email">
              {(field) => (
                <Field.Root
                  id="email"
                  invalid={!field.state.meta.isValid}
                  disabled={isSignInPending}
                >
                  <Field.Label>Email address</Field.Label>
                  <Field.Input
                    type="email"
                    placeholder="Enter your email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  <Field.ErrorMessage>
                    {field.state.meta.errors[0]?.message}
                  </Field.ErrorMessage>
                </Field.Root>
              )}
            </form.Field>

            <form.Field name="password">
              {(field) => (
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={field.state.value}
                    invalid={!field.state.meta.isValid}
                    disabled={isSignInPending}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Enter your password"
                  />
                  {!field.state.meta.isValid && (
                    <p className="text-red-600 text-sm">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          <div>
            <Button
              type="submit"
              disabled={isSignInPending || !form.state.canSubmit}
              loading={isSignInPending}
              className="w-full"
            >
              Sign in
            </Button>
          </div>

          {signInError && (
            <div className="text-red-600 text-sm text-center">
              {signInError.message || "Sign in failed"}
            </div>
          )}

          <div className="text-center space-y-4">
            <div>
              <Link
                to="/signup"
                className="text-green-600 hover:text-green-500 text-sm"
              >
                Don't have an account? Sign up
              </Link>
            </div>
            <div>
              <Link
                to="/"
                className="text-green-600 hover:text-green-500 text-sm"
              >
                ← Back to home
              </Link>
            </div>
          </div>
        </form>
      </Container.Content>
    </Container.Root>
  );
}
