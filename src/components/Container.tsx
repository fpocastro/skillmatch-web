import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Link } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";
import { Button } from "./Button";

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
  const { isAuthenticated, user, signOut, isLogoutPending } = useAuth();

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
            className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
            aria-label="Open menu"
          >
            {user?.firstName[0]}
            {user?.lastName[0]}
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="min-w-56 bg-white p-1 rounded-md shadow-md duration-300 ease-[cubic-bezier(0.16, 1, 0.3, 1)] will-change-[transform, opacity]"
            align="start"
            sideOffset={5}
            alignOffset={-3}
          >
            <DropdownMenu.Item>
              <Link
                to="/profile"
                className="text-md text-green-300 hover:text-black rounded-sm flex items-center h-6 pr-1 pl-6 py-2 relative select-none outline-none hover:bg-green-400"
              >
                Profile
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Link
                to="/settings"
                className="text-md text-green-300 hover:text-black rounded-sm flex items-center h-6 pr-1 relative pl-6 select-none outline-none hover:bg-green-400"
              >
                Settings
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="h-px bg-green-800 m-1" />
            <DropdownMenu.Item
              className="text-md text-green-300 hover:text-black rounded-sm flex items-center h-6 pr-1 relative pl-6 select-none outline-none hover:bg-green-400"
              disabled={!isLogoutPending}
              onClick={signOut}
            >
              Sign Out
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
          <Link to="/" className="text-2xl font-bold text-green-600">
            SkillMatch
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-6">
            <Link
              to="/places"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Places
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                Dashboard
              </Link>
            )}
          </div>
          {isAuthenticated ? (
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
