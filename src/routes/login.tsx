import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginPage } from "../features/Auth";

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>) => ({
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
  }),
  beforeLoad: () => {
    if (localStorage.getItem("auth.user")) {
      throw redirect({ to: "/" });
    }
  },
  component: LoginPage,
});