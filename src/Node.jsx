import React from "react";
import "./node.css";
import { click } from "@testing-library/user-event/dist/click";
export const Node = (props) => {
  let cName =
    props.type === "start"
      ? "node-start"
      : props.type === "end"
      ? "node-finish"
      : "";

  const classes = `node ${cName}`;
  const ids = `node-${props.row}-${props.col}`;
  function handleClick() {
    console.log(props.sAndD);
    if (props.sAndD === 0) {
      document.getElementById(ids).className = "node node-start";
      props.setNodeDetail((prev) => [...prev, props.row, props.col]);
      props.setsAndD(1);
    } else if (props.sAndD === 1) {
      document.getElementById(ids).className = "node node-finish";
      props.setNodeDetail((prev) => [...prev, props.row, props.col]);
      props.setsAndD(2);
    }
  }
  return <div onClick={handleClick} id={ids} className={classes}></div>;
};
