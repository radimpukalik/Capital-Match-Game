import { ReactNode } from "react";

//cn = class names
const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(" "); //Boolean clears falsy values
};

const MaxWidthWrapper = ({ className, children }: { className?: string; children: ReactNode }) => {
  return <div className={cn("h-full mx-auto w-full max-w-screen-lg", className)}>{children}</div>;
};

export default MaxWidthWrapper;
