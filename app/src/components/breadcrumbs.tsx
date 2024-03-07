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
  if (!Array.isArray(items) || items.length < 2) return null;
  return (
    <div className={classNames("breadcrumbs py-0 px-3 md:px-0", className)}>
      <ul className={classNames("flex gap-1", className)}>
        {items.map((item, index, list) => {
          const isLast = index === list.length - 1;
          return (
            <li key={index} className="flex items-center gap-1">
              {!isLast && item.href ? (
                <Link
                  href={item.href}
                  className={classNames("btn btn-link px-0 hover:opacity-60")}
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold">{item.label}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
