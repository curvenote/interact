import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getContext } from "thebe-core";
import { selectors } from "./store";

function Output({
  notebookId,
  cellId,
  runButton,
  placeholder,
}: {
  notebookId?: string;
  cellId: string;
  runButton?: boolean;
  placeholder?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current == null || !notebookId) return;
    console.log(`Cell ${cellId} side effect`, ref);
    const ctx = getContext();
    const notebook = ctx.notebooks[notebookId];
    const cell = notebook.getCellById(cellId);
    cell?.attach(ref.current);
  }, [notebookId, cellId]);

  const activeKernelId = useSelector(selectors.compute.getActiveKernelId);

  const clickPlay = () => {
    console.log("click play", activeKernelId, cellId);
    if (!activeKernelId || !notebookId) return;
    const ctx = getContext();
    const notebook = ctx.notebooks[notebookId];
    notebook?.executeUpTo(activeKernelId, cellId);
  };

  return (
    <div className="output" style={{ minHeight: 325 }}>
      {runButton && <button onClick={clickPlay}>{">"}</button>}
      <div ref={ref}>{placeholder}</div>
    </div>
  );
}

export default Output;
