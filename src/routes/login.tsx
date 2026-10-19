import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginPage } from "../features/Auth";
import { isLoggedIn } from "../lib/authStorage";

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>) => ({
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
  }),
  beforeLoad: () => {
    if (isLoggedIn()) {
      throw redirect({ to: "/" });
    }
  },
  component: LoginPage,
});
