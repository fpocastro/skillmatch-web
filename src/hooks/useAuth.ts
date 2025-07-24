import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { fetchAuthSession } from "aws-amplify/auth";
import { authService, type SignInCredentials } from "../services/authService";

const AUTH_QUERY_KEY = ["auth", "user"];

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: user, isLoading } = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: async () => {
      try {
        const { tokens } = await fetchAuthSession();
        if (!tokens?.idToken) {
          return null;
        }

        return authService.getCurrentUser();
      } catch (error) {
        console.error("Error in auth query:", error);
        return null;
      }
    },
    staleTime: Infinity,
    retry: false,
  });

  const signInMutation = useMutation({
    mutationFn: authService.signIn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
      router.navigate({ to: "/dashboard" });
    },
  });

  const signOutMutation = useMutation({
    mutationFn: authService.signOut,
    onSuccess: () => {
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
      router.navigate({ to: "/" });
    },
  });

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn: (credentials: SignInCredentials) =>
      signInMutation.mutate(credentials),
    signOut: () => signOutMutation.mutate(),
    isSignInPending: signInMutation.isPending,
    isLogoutPending: signOutMutation.isPending,
    signInError: signInMutation.error,
  };
}
