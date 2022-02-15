import React from "react";
import { useSelector } from "react-redux";
import Notebook from "thebe-core/dist/notebook";
import { selectors } from "./store";

const RunAll = ({ notebook }: { notebook?: Notebook }) => {
  const activeKernelId = useSelector(selectors.compute.getActiveKernelId);

  const clickRunAll = () => {
    if (!activeKernelId || !notebook) return;
    notebook?.executeAll(activeKernelId);
  };

  return (
    <div>
      <button
        style={{ marginTop: 5 }}
        onClick={clickRunAll}
        disabled={!Boolean(activeKernelId)}
      >
        {">>|"}
      </button>
    </div>
  );
};

export default RunAll;
