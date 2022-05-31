import React from "react";
import "./dropdown.css";

function Dropdown(props) {
  const { handleAdd, handleChange, handleRemove, form } = props;
  return (
    <div className="dropdown">
      <form className="from">
        {form.map((item, index) => (
          <div className="row drop" key={index}>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="title"
                required
                value={item?.title}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="col">
              <div style={{ display: "flex" }}>
                <input
                  type="text"
                  className="form-control"
                  name="body"
                  placeholder="body"
                  required
                  value={item?.body}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
            </div>
            <div className="col">
              <button
                className="btn btn-outline-danger"
                type="button"
                style={{ width: 50, marginLeft: 5 }}
                onClick={(e) => handleRemove(e, item.id, index)}
              >
                X
              </button>
            </div>
          </div>
        ))}
        <button
          className="btn btn-primary"
          type="button"
          onClick={(e) => handleAdd(e)}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default Dropdown;
