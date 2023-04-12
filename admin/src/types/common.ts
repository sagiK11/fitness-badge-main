import React from "react";

export interface WrapperProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType<any>;
}

export interface FormField {
  name: string;
}
