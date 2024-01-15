import React from "react";
import { useDropdown } from "./dropdown-context";

const Option = (props) => {
  const { onClick } = props;
  const { setShow } = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <div
      className="px-3 py-2 cursor-pointer border border-slate-400 hover:border-green-600 rounded-xl w-fit items-center justify-between hover:text-primary transition-all text-sm font-medium"
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};

export default Option;
