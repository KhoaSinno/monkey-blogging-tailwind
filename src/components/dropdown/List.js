import React from "react";
import { useDropdown } from "./dropdown-context";

const List = ({ children }) => {
  const { show } = useDropdown();
  return (
    <>
      {show && (
        <div className="absolute top-full left-0 w-full bg-white shadow-sm flex flex-wrap gap-2 z-50">
          {children}
        </div>
      )}
    </>
  );
};

export default List;
