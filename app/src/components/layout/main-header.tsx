import { useAuth, useYearOfStudy } from "@/hooks";
import { routesTree } from "@/routesTree";
import { Button } from "../button";
import { Typography } from "../typography";
import { FlexBox } from "../flexbox";

export function MainHeader() {
  const { signOut, user } = useAuth();
  const { yearOfStudyOptions, currentYearOfStudy } = useYearOfStudy();

  return (
    <header className="navbar shadow-sm bg-primary text-white sticky top-0 z-10">
      <div className="navbar-start">
        {user?.email && (
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
                <button onClick={signOut}>התנתק</button>
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
          Fitness Badge
        </Button>
      </div>
      <div className="navbar-end">
        <FlexBox className="items-center shrink-0">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-sm md:btn-md">
              <Typography className="font-bold">
                {currentYearOfStudy.yearName}
              </Typography>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black"
            >
              {yearOfStudyOptions.map((yearOfStudy) => {
                return (
                  <li key={yearOfStudy.value}>
                    <Button
                      href={
                        routesTree({ yearOfStudyId: yearOfStudy.value })
                          .yearOfStudy
                      }
                      onClick={() => {
                        const el = document.activeElement;
                        if (
                          el &&
                          "blur" in el &&
                          typeof el.blur === "function"
                        ) {
                          el.blur();
                        }
                      }}
                    >
                      {yearOfStudy.label}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
        </FlexBox>
      </div>
    </header>
  );
}
