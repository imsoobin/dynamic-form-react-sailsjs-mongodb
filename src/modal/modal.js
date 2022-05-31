import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import Dropdown from "./Dropdown/dropdown";
import "./modal.css";

function Modal(props) {
  const {
    close,
    setClose,
    isDrop,
    handleChange,
    handleSubmit,
    value,
    type,
    isEdit,
    test,
    setIsDrop,
  } = props;
  const closeModal = () => {
    setClose(false);
    if (type === "drop") {
      setIsDrop(false);
    }
  };
  const [form, setForm] = useState([]);
  const handleAdd = (e) => {
    e.preventDefault();
    const info = {
      title: "",
      body: "",
    };
    setForm((prev) => [...prev, info]);
  };
  const handleChanges = (index, e) => {
    e.preventDefault();
    e.persist();
    setForm((prev) => {
      return prev.map((item, i) => {
        if (i !== index) {
          return item;
        }
        return {
          ...item,
          [e.target.name]: e.target.value,
        };
      });
    });
  };
  const handleRemove = (e, id, index) => {
    e.preventDefault();
    setForm((prev) => prev.filter((item) => item !== prev[index]));
  };

  return (
    <>
      {close && (
        <div className="modals">
          <div
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Add attributes
                  </h5>
                  {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col">
                        <label htmlFor="label">Label *</label>
                        <div style={{ display: "flex" }}>
                          <input
                            type="text"
                            className="form-control"
                            name="label"
                            value={!isEdit ? value?.label : test?.label}
                            onChange={handleChange}
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <label htmlFor="label">Field Name *</label>
                        <div style={{ display: "flex" }}>
                          <input
                            type="text"
                            className="form-control"
                            name="label"
                            value={!isEdit ? value?.label : test?.label}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <label>Info</label>
                        <div style={{ display: "flex" }}>
                          <input
                            type="text"
                            className="form-control"
                            name="info"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col">
                        <label>Default value</label>
                        {type === "drop" ? (
                          <>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              name="dropvalue"
                              value={
                                !isEdit ? value?.dropvalue : test?.dropvalue
                              }
                              defaultValue={value.dropvalue}
                              onChange={handleChange}
                            >
                              <option value="" defaultValue="" selected>
                                ...
                              </option>
                              {form.map((m, i) => (
                                <option
                                  defaultValue={m.title}
                                  value={m.title}
                                  key={i}
                                >
                                  {m.title}
                                </option>
                              ))}
                            </select>
                          </>
                        ) : (
                          <div style={{ display: "flex" }}>
                            <input
                              type={
                                type === "texts" || type === "area"
                                  ? "text"
                                  : type === "num"
                                  ? "number"
                                  : ""
                              }
                              className="form-control"
                              name="values"
                              placeholder="..."
                              value={!isEdit ? value?.values : test?.values}
                              onChange={handleChange}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          name="types"
                          value={!isEdit ? value.types : test.types}
                          defaultValue={!isEdit ? value.types : test.types}
                          onChange={handleChange}
                        >
                          <option
                            disabled
                            style={{ fontWeight: "bold" }}
                            value="..."
                            selected
                          >
                            ChooseType
                          </option>
                          <option value="texts">texts</option>
                          <option value="num">num</option>
                          <option value="area">area</option>
                          <option value="drop">drop</option>
                        </select>
                      </div>
                      <div className="col">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            name="keybox"
                            value={!isEdit ? value.keybox : test.keybox}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexSwitchCheckDefault"
                          >
                            Required field
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Save attributes
                      </button>
                    </div>
                  </form>
                </div>
                {isDrop && type === "drop" ? (
                  <Dropdown
                    handleAdd={handleAdd}
                    handleChange={handleChanges}
                    handleRemove={handleRemove}
                    form={form}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
