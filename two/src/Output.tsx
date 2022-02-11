import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Notebook from "thebe-core/dist/notebook";
import { selectors } from "./store";

function Output({ notebook, cellId }: { notebook?: Notebook; cellId: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current == null || !notebook) return;
    console.log(`Cell ${cellId} side effect`, ref);
    const cell = notebook.getCellById(cellId);
    cell?.attach(ref.current);
  }, [!notebook, cellId]);

  const activeKernelId = useSelector(selectors.compute.getActiveKernelId);

  const clickPlay = () => {
    console.log("click play", activeKernelId, cellId);
    if (!activeKernelId) return;
    notebook?.exectuteUpTo(activeKernelId, cellId, {});
  };

  return (
    <div className="output">
      <button onClick={clickPlay}>{">"}</button>
      <div ref={ref}>
        <div>OUTPUT: {cellId}</div>
      </div>
    </div>
  );
}

export default Output;
