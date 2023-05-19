import classNames from "classnames";

type Size = "sm" | "md" | "lg";
interface LoaderProps {
  className?: string;
  holderClassName?: string;
  size?: Size;
}

const SizeMap: Record<Size, string> = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-8 h-8 border-4",
};

export function Loader({
  holderClassName,
  className,
  size = "sm",
}: LoaderProps) {
  return (
    <div
      className={classNames(
        "inline-block animate-spin rounded-full border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]",
        holderClassName,
        SizeMap[size]
      )}
      role="status"
    >
      <span
        className={classNames(
          "!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]",
          className
        )}
      >
        Loading...
      </span>
    </div>
  );
}
