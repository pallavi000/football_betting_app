import React from "react";
import { Bars } from "react-loader-spinner";

function FileSubmitLoader() {
  return (
    <div className="page-loader-container form-sub">
      <Bars color="#00BFFF" height={80} width={80} />
    </div>
  );
}

export default FileSubmitLoader;
