interface IProp extends React.HTMLAttributes<HTMLSpanElement> {
  color: string;
}

const CircleColor = ({ color ,...rest}: IProp) => {
  return (
    <span
      className={`w-5 h-5  rounded-full cursor-pointer`}
      // we used style for background color because in tailwind work at build time and react at run time
      // so the color will not change if we use tailwind for that  bg-[color]= bg-[#ffff]
      style={{ background: color }}
      {...rest}
    />
  );
};

export default CircleColor;
