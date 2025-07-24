import { useForm } from "@tanstack/react-form";
import { Link, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { z } from "zod";
import { Button } from "../components/Button";
import { Field } from "../components/Field";
import { Input } from "../components/Input";
import { useAuth } from "../hooks/useAuth";
import { Container } from "../layouts/Container";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const { signIn, isLoginPending, loginError, isAuthenticated } = useAuth();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
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
        <div className="max-w-md w-full space-y-8">
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
                    disabled={isLoginPending}
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
                      disabled={isLoginPending}
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
                disabled={isLoginPending || !form.state.canSubmit}
                loading={isLoginPending}
                className="w-full"
              >
                Sign in
              </Button>
            </div>

            {loginError && (
              <div className="text-red-600 text-sm text-center">
                {loginError.message || "Login failed"}
              </div>
            )}

            <div className="text-center">
              <Link
                to="/"
                className="text-green-600 hover:text-green-500 text-sm"
              >
                ← Back to home
              </Link>
            </div>
          </form>
        </div>
      </Container.Content>
    </Container.Root>
  );
}
