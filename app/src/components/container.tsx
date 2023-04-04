import { WrapperProps } from "@/types";
import classNames from "classnames";

export type MaxWidth =
  | "viewport"
  | "1536px"
  | "896px"
  | "768px"
  | "512px"
  | "384px";

const MAX_WIDTH: Record<MaxWidth, string> = {
  viewport: "",
  "1536px": "flex flex-col md:container md:mx-auto md:px-4",
  "896px": "flex flex-col md:container md:mx-auto md:px-4 md:max-w-4xl",
  "768px": "flex flex-col md:container md:mx-auto md:px-4 md:max-w-3xl",
  "512px": "flex flex-col md:container md:mx-auto md:px-4 md:max-w-lg",
  "384px": "flex flex-col md:container md:mx-auto md:px-4 md:max-w-sm",
};

interface ContainerProps
  extends WrapperProps,
    Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  maxWidth?: MaxWidth;
  [x: string]: any;
}

export function Container({
  children,
  maxWidth = "1536px",
  className,
  as = "div",
  ...props
}: ContainerProps) {
  const Component = as;

  return (
    <Component
      className={classNames(MAX_WIDTH[maxWidth], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
