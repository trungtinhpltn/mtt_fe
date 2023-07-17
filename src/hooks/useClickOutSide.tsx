import { useEffect, useRef } from "react";

const useClickOutSide = (callback: (e: any) => void) => {
  const innerRef = useRef<any>();

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e: any) {
      if (innerRef.current && !innerRef.current.contains(e.target)) callback(e);
    }
  }, [callback]);

  return innerRef;
};
export default useClickOutSide;
