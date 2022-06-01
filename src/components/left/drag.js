export const DragFunc = (setClose) => {
  let dragged;
  document.addEventListener("dragstart", (event) => {
    dragged = event.target;
    event.target.classList.add("dragging");
  });

  document.addEventListener("dragend", (event) => {
    // reset the transparency
    event.target.classList.remove("dragging");
  });
  document.addEventListener(
    "dragover",
    (event) => {
      event.preventDefault();
    },
    false
  );

  document.addEventListener("dragenter", (event) => {
    if (event.target.classList.contains("dropzone")) {
      event.target.classList.add("dragover");
    }
  });

  document.addEventListener("dragleave", (event) => {
    // reset background of potential drop target when the draggable element leaves it
    if (event.target.classList.contains("dropzone")) {
      event.target.classList.remove("dragover");
    }
  });

  document.addEventListener("drop", (event) => {
    event.preventDefault();
    // move dragged element to the selected drop target
    if (event.target.classList.contains("dropzone")) {
      event.target.classList.remove("dragover");
      setClose(true);
    }
  });
};
