import { twMerge } from "tailwind-merge";
import baseClassNames from "classnames";

/**
 * Encapsulation of classnames with tailwind-merge
 *  */
export function cls(...inputs: Parameters<typeof baseClassNames>) {
  return twMerge(baseClassNames(inputs));
}
