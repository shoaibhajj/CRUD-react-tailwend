import { ReactNode } from "react";

interface IProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: "w-full" | "w-fit";
}

const Button = ({
  className = "bg-sky-500",
  children,
  width = "w-full",
  ...rest
}: IProp) => {
  return (
    <button
      className={`${className} ${width}  p-3 text-white rounded-md  flex-1 cursor-pointer`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
