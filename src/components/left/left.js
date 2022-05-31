import React from "react";
import "./left.css";
import { TextIcon, TextArea, NumberIcon, DropdownIcon } from "../../icons/icon";

function Left(props) {
  const { toggleModal, sesstion, addSessionToUse, value } = props;
  const types = {
    drop: "drop",
    textarea: "textarea",
    text: "text",
    number: "number",
  };
  return (
    <div className="left">
      <div className="list_btn">
        <button
          type="button"
          className="btn btn-success"
          onClick={
            sesstion || value.length > 0
              ? () => toggleModal(types.text)
              : addSessionToUse
          }
        >
          <TextIcon /> <span>Text</span>
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={
            sesstion || value.length > 0
              ? () => toggleModal(types.textarea)
              : addSessionToUse
          }
        >
          <TextArea /> <span>TextArea</span>
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={
            sesstion || value.length > 0
              ? () => toggleModal(types.number)
              : addSessionToUse
          }
        >
          <NumberIcon /> <span>Number</span>
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={
            sesstion || value.length > 0
              ? () => toggleModal(types.drop)
              : addSessionToUse
          }
        >
          <DropdownIcon /> <span>Dropdown</span>
        </button>
      </div>
    </div>
  );
}

export default Left;
