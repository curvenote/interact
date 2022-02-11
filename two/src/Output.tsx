import React from "react";

function Output({ cellId }: { cellId: string }) {
  return <div className="output">OUTPUT: {cellId}</div>;
}

export default Output;
