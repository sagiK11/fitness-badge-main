import { WrapperProps } from "@/types";
import classNames from "classnames";
import Link from "next/link";
import { Loader } from "./loader";

interface ButtonProps
  extends WrapperProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  href?: string;
  iconStart?: (props: any) => JSX.Element;
  iconEnd?: (props: any) => JSX.Element;
  loadingStart?: boolean;
  loadingEnd?: boolean;
  htmlFor?: string;
}

export function Button({
  children,
  as = "button",
  className,
  iconStart,
  iconEnd,
  loadingStart,
  loadingEnd,

  ...props
}: ButtonProps) {
  let Component = as;
  if (props.href) {
    Component = Link;
  }
  const disabled = loadingEnd || loadingStart || props.disabled;

  return (
    <Component
      className={classNames(className, "btn gap-1")}
      {...props}
      disabled={disabled}
    >
      <LoaderOrIcon icon={iconStart} isLoading={loadingStart} />
      {children}
      <LoaderOrIcon icon={iconEnd} isLoading={loadingEnd} />
    </Component>
  );
}

const LoaderOrIcon = ({ icon: Icon, isLoading }: any) => {
  if (isLoading) return <Loader />;
  if (Icon) return <Icon />;
  return null;
};
