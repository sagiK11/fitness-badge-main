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
    <div className={classNames("breadcrumbs", className)}>
      <ul className={classNames("flex gap-1", className)}>
        {items.map((item, index, list) => {
          const isLast = index === list.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1">
              {!isLast && item.href ? (
                <>
                  <Link
                    href={item.href}
                    className={classNames("btn btn-link px-0 hover:opacity-60")}
                  >
                    {item.label}
                  </Link>
                </>
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
