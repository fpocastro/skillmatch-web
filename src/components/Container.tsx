import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Link } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";
import { Button } from "./Button";
import { Skeleton } from "./Skeleton";

interface ContainerRootProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

function Root({ children, ...rest }: ContainerRootProps) {
  return (
    <div className="flex flex-col min-h-screen" {...rest}>
      {children}
    </div>
  );
}

interface ContainerContentProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

function Content({
  children,
  size = "lg",
  className = "",
  ...rest
}: ContainerContentProps) {
  const sizeClasses = {
    sm: "max-w-2xl",
    md: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-8xl",
    full: "max-w-full",
  };

  return (
    <div
      className={`flex flex-col flex-1 mx-auto px-4 pb-4 ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

interface ContainerNavbarProps extends React.ComponentProps<"nav"> {}

function Navbar({ ...rest }: ContainerNavbarProps) {
  const { isAuthenticated, user, signOut, isLogoutPending, isLoading } =
    useAuth();

  function UnauthenticatedControls() {
    return (
      <Button asChild>
        <Link to="/signin">Sign In</Link>
      </Button>
    );
  }

  function AuthenticatedControls() {
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            className="relative inline-flex items-center justify-center w-10 h-10 cursor-pointer overflow-hidden bg-gray-100 rounded-full dark:bg-gray-400"
            aria-label="Open menu"
          >
            {user?.firstName[0]}
            {user?.lastName[0]}
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="min-w-48 bg-white rounded-lg shadow-lg border border-gray-200 p-2 animate-in fade-in-0 zoom-in-95"
            align="end"
            sideOffset={8}
          >
            <DropdownMenu.Item asChild>
              <Link
                to="/profile"
                className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
                aria-label="Profile"
              >
                Profile
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild>
              <Link
                to="/settings"
                className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
                aria-label="Settings"
              >
                Settings
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />
            <DropdownMenu.Item>
              <button
                type="button"
                className="flex w-full items-center px-3 py-2 text-sm text-red-600 rounded-md hover:bg-red-50 cursor-pointer hover:text-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLogoutPending}
                onClick={signOut}
              >
                Sign Out
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  }

  return (
    <nav
      className="sticky flex w-full h-18 z-0 top-0 start-0 bg-white border-b border-gray-200 shadow-sm"
      {...rest}
    >
      <div className="max-w-screen-xl flex flex-1 flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-8">
          <Link
            to="/"
            className="text-2xl font-bold text-green-600"
            aria-label="Home page"
          >
            SkillMatch
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-6">
            {isLoading ? (
              <Skeleton className="h-5 w-20" />
            ) : (
              <Link
                to="/places"
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
                aria-label="Places"
              >
                Places
              </Link>
            )}
            {isLoading ? (
              <Skeleton className="h-5 w-20" />
            ) : (
              isAuthenticated && (
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors"
                  aria-label="Dashboard"
                >
                  Dashboard
                </Link>
              )
            )}
          </div>
          {isLoading ? (
            <Skeleton form="circle" className="h-10 w-10" />
          ) : isAuthenticated ? (
            <AuthenticatedControls />
          ) : (
            <UnauthenticatedControls />
          )}
        </div>
      </div>
    </nav>
  );
}

export const Container = {
  Root,
  Navbar,
  Content,
};
