import classNames from "classnames";
import Link from "next/link";

type Item = {
  label: string;
  href?: string;
};
interface BreadcrumbsProps {
  items: Item[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <div className={classNames(className)}>
      <ul className={classNames("flex gap-1 ", className)}>
        {items.map((item, index, list) => {
          const isLast = index === list.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1">
              {!isLast && item.href ? (
                <>
                  <Link
                    href={item.href}
                    className={classNames({
                      "hover:underline": !isLast,
                    })}
                  >
                    {item.label}
                  </Link>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
