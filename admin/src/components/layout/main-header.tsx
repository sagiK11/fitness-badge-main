import { useAdmin, useAuth } from "@/hooks";
import { routesTree } from "@/utils";
import { Button } from "../button";

export function MainHeader() {
  const { signOut } = useAuth();
  const { admin, initials } = useAdmin();

  return (
    <header className="navbar shadow-sm bg-primary text-white fixed top-0 z-10">
      <div className="navbar-start">
        {admin && (
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black"
            >
              <li>
                <button onClick={signOut}>Log out</button>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="navbar-center">
        <Button
          className="btn btn-ghost normal-case text-xl"
          href={routesTree().home}
        >
          Fitness Badge Admin
        </Button>
      </div>

      <div className="navbar-end">
        {admin && (
          <div className="avatar online placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
              <span className="text-xl">{initials}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
