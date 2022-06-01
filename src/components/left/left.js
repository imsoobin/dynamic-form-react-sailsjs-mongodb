import React, { useEffect } from "react";
import "./left.css";
import { TextIcon, TextArea, NumberIcon, DropdownIcon } from "../../icons/icon";
import { DragFunc } from "./drag";

function Left(props) {
  const { toggleModal, sesstion, addSessionToUse, value, setClose } = props;
  const types = {
    drop: "drop",
    textarea: "textarea",
    text: "text",
    number: "number",
  };

  useEffect(() => {
    DragFunc(setClose);
  }, [setClose]);
  return (
    <div className="left">
      <div className="list_btn">
        <button
          id="draggable01"
          draggable="true"
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
          id="draggable02"
          draggable="true"
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
          id="draggable03"
          draggable="true"
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
          id="draggable04"
          draggable="true"
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
        {/* <button className="btn btn-success">Date</button>
        <button className="btn btn-success">Date&Time</button>
        <button className="btn btn-success">Email</button>
        <button className="btn btn-success">Password</button>
        <button className="btn btn-success">Image</button>
        <button className="btn btn-success">Checkbox</button>
        <button className="btn btn-success">Checklist</button>
        <button className="btn btn-success">Slider</button>
        <button className="btn btn-success">Button</button>
        <button className="btn btn-success">Rating</button> */}
      </div>
    </div>
  );
}

export default Left;
