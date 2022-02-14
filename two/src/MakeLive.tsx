import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "./store";

const MakeLive = ({ notebookId }: { notebookId?: string }) => {
  const dispatch = useDispatch();
  const isLive = useSelector(selectors.ui.getIsLive);
  const activeKernelId = useSelector(selectors.compute.getActiveKernelId);

  const clickMakeLive = () => {
    if (!activeKernelId || !notebookId) return;
    dispatch(actions.ui.setIsLive(true));
    // notebookId?.executeAll(activeKernelId, {});
  };

  const notLive = "--o--";
  const live = "))>live<((";

  return (
    <div>
      <button
        style={{ marginTop: 5 }}
        onClick={clickMakeLive}
        disabled={!Boolean(activeKernelId) || isLive}
      >
        {isLive ? live : notLive}
      </button>
    </div>
  );
};

export default MakeLive;
