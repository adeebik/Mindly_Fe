import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary" | "outline" | "ghost" | "danger" | "dangerOutline";
  text?: string;
  size: "xs" | "sm" | "md" | "lg";
  onclick?: () => void;
  isDisable?: boolean;
  startIcon?: ReactElement;
  fullWidth?: boolean;
  type?: "submit" | "button";
  children?: ReactElement,
}

const variantStyle = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-zinc-100 text-zinc-700 hover:bg-zinc-200",
  outline:
    "border bg-white border-zinc-300 rounded-md text-zinc-600 hover:text-zinc-700  hover:bg-zinc-100",
  ghost: "text-gray-700 hover:bg-gray-100",
  danger: "bg-red-600 text-white hover:bg-red-700",
  dangerOutline : "border bg-white border-zinc-300 rounded-md text-zinc-600 hover:border-red-200 hover:bg-red-50 hover:text-red-500",
};

const sizeStyle = {
  xs: "text-sm p-1.5",
  sm: "text-sm px-3 py-1.5",
  md: "text-sm px-4 py-2.5",
  lg: "text-base px-6 py-3",
};

const defaultStyles =
  "flex justify-center items-center rounded-lg gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer";

export default function Button(props: ButtonProps) {
  return (
    <button
      type={props.type}
      disabled={props.isDisable}
      onClick={props.onclick}
      className={`${variantStyle[props.variant]} ${sizeStyle[props.size]} ${
        props.fullWidth ? "w-full" : ""
      } ${defaultStyles}`}
    >
      {props.startIcon}
      {props.text}
      {props.children}
    </button>
  );
}
