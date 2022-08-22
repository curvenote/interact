import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { actions } from "@curvenote/runtime";

export interface RActionProps {
  scope: string;
  value: string;
  children: React.ReactNode;
}

function SimpleAction({ value, scope, children }: RActionProps) {
  const dispatch = useDispatch();
  const ref = useRef<any>();

  useEffect(() => {
    ref.current = dispatch(
      actions.createComponent(
        "action",
        { value: { func: value }, min: { value: 1 } },
        { change: { func: value } },
        { scope }
      )
    );
  }, []);

  const click = () => {
    if (!ref.current) return;
    ref.current.set();
  };

  return <button onClick={click}>{children}</button>;
}

export default SimpleAction;
