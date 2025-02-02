import { IFormInput } from "../../interfaces";

interface IProp extends React.InputHTMLAttributes<HTMLInputElement> {
  input: IFormInput;
}

const Input = ({ input, ...rest }: IProp) => {
  return (
    <input
      className="border-[1px] border-gray-300 shadow-md
    focus:border-indigo-500 focus:outline-none focus:ring-1
    focus:ring-indigo-500 rounded-md px-3 py-3 text-md"
      {...rest}
    />
  );
};

export default Input;
