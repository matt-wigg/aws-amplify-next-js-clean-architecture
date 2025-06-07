import { NavLink } from "@nextjs/components/layout/nav-link";
import { SignOutForm } from "@nextjs/components/auth/sign-out-form";
import { ROUTES } from "@nextjs/constants/routes.constants";

/**
 * Primary navigation bar with links and sign-out control.
 */
export function Nav() {
  return (
    <header className="border-b border-border">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        <nav className="flex gap-2 sm:gap-4">
          <NavLink href={ROUTES.INTERNAL.HOME}>Todos</NavLink>
          <NavLink href={ROUTES.INTERNAL.DRAGGABLE}>Draggable Todos</NavLink>
        </nav>
        <SignOutForm />
      </div>
    </header>
  );
}
