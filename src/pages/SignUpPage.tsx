import { useForm } from "@tanstack/react-form";
import { Link, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { z } from "zod";
import { Button } from "../components/Button";
import { Field } from "../components/Field";
import { Input } from "../components/Input";
import { useAuth } from "../hooks/useAuth";
import { Container } from "../layouts/Container";

const signUpSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

export default function SignUpPage() {
  const { signUp, isSignUpPending, signUpError, isAuthenticated } = useAuth();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    validators: {
      onSubmit: signUpSchema,
    },
    onSubmit: async ({ value }) => {
      signUp(value);
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
              Create your account
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
              <form.Field name="firstName">
                {(field) => (
                  <Field.Root
                    id="firstName"
                    invalid={!field.state.meta.isValid}
                    disabled={isSignUpPending}
                  >
                    <Field.Label>First Name</Field.Label>
                    <Field.Input
                      type="text"
                      placeholder="Enter your first name"
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

              <form.Field name="lastName">
                {(field) => (
                  <Field.Root
                    id="lastName"
                    invalid={!field.state.meta.isValid}
                    disabled={isSignUpPending}
                  >
                    <Field.Label>Last Name</Field.Label>
                    <Field.Input
                      type="text"
                      placeholder="Enter your last name"
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

              <form.Field name="email">
                {(field) => (
                  <Field.Root
                    id="email"
                    invalid={!field.state.meta.isValid}
                    disabled={isSignUpPending}
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
                      disabled={isSignUpPending}
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
                disabled={isSignUpPending || !form.state.canSubmit}
                loading={isSignUpPending}
                className="w-full"
              >
                Sign up
              </Button>
            </div>

            {signUpError && (
              <div className="text-red-600 text-sm text-center">
                {signUpError.message || "Sign up failed"}
              </div>
            )}

            <div className="text-center space-y-2">
              <Link
                to="/signin"
                className="text-green-600 hover:text-green-500 text-sm"
              >
                Already have an account? Sign in
              </Link>
              <br />
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