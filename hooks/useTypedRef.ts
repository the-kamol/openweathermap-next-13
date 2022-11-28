import { useRef } from "react";

export const useTypedRef = () => {
  return useRef() as React.MutableRefObject<HTMLInputElement>;
};
