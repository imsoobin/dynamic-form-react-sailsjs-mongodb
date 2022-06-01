import axios from "axios";
import React, { useState } from "react";

function CreateFrom(props) {
  const { closeNewForm } = props;
  const [formname, setFormname] = useState();

  const handleChangeFormName = (e) => {
    setFormname(e.target.value);
  };

  const addNewForm = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:1337/form/addForm",
        { formName: formname },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        // alert("added");
        window.location.reload();
      })
      .catch((err) => {
        alert(err.response.data);
        return;
      });
  };

  return (
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
                New Form
              </h5>
            </div>
            <div className="modal-body">
              <form onSubmit={addNewForm}>
                <div className="row">
                  <div className="col">
                    <label htmlFor="label">Form Name *</label>
                    <div style={{ display: "flex" }}>
                      <input
                        type="text"
                        className="form-control"
                        name="label"
                        autoComplete="off"
                        value={formname}
                        onChange={(e) => handleChangeFormName(e)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeNewForm}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateFrom;
