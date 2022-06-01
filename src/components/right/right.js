import React from "react";
import "./right.css";
import { DeleteIcon, EditIcon } from "../../icons/icon";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Right(props) {
  const {
    openSession,
    sesstion,
    setSesstion,
    value,
    setAllValue,
    handleEditForm,
  } = props;

  const closeSession = () => {
    setSesstion(!sesstion);
  };
  const handleRemoveForm = (index, id) => {
    if (id && window.confirm("Are you sure?") === true) {
      axios
        .delete(`http://localhost:1337/field/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          toast.success("deleted");
          window.location.reload();
        })
        .catch((err) => toast.error(err));
    }
    if (!id) {
      setAllValue((prev) => prev.filter((item) => item !== prev[index]));
    }
  };

  return (
    <div className="right">
      {value.length < 1 && (
        <div className="btn_add_session">
          <button onClick={openSession}>Add session</button>
        </div>
      )}
      <div className="dropzone"></div>
      {(sesstion || value.length > 0) && (
        <section>
          <div className="top_sesssion">
            <div className="session">Create something</div>
            {value.length <= 0 && (
              <div onClick={closeSession} style={{ cursor: "pointer" }}>
                <DeleteIcon />
              </div>
            )}
          </div>
          {value?.map((v, index) => (
            <div className="sesstion_content" key={index}>
              {v?.types === "texts" && v?.label ? (
                <div key={index}>
                  <label style={{ marginLeft: "5%" }}>{v.label}</label>
                  <input
                    style={{ width: "90%", margin: "0 auto" }}
                    type="text"
                    className="form-control"
                    name="body"
                    value={v.values}
                    placeholder=""
                    disabled
                  />
                </div>
              ) : (
                <>
                  {v?.types === "area" && v?.label ? (
                    <div key={index}>
                      <label style={{ marginLeft: "5%" }}>{v?.label}</label>
                      <textarea
                        style={{ width: "90%", margin: "0 auto" }}
                        // type="text"
                        className="form-control"
                        name="body"
                        value={v.values}
                        placeholder=""
                        rows="4"
                        cols="100"
                        disabled
                      ></textarea>
                    </div>
                  ) : (
                    <>
                      {v?.types === "num" && v?.label ? (
                        <div key={index}>
                          <label style={{ marginLeft: "5%" }}>{v.label}</label>
                          <input
                            style={{ width: "90%", margin: "0 auto" }}
                            type="number"
                            className="form-control"
                            name="body"
                            value={v.values}
                            placeholder=""
                            disabled
                          />
                        </div>
                      ) : (
                        <>
                          {v?.types === "drop" && v?.label && (
                            <div key={index}>
                              <label style={{ marginLeft: "5%" }}>
                                {v.label}
                              </label>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                style={{ width: "90%", margin: "0 auto" }}
                              >
                                <option disabled>Please choose</option>
                                <option selected value={v.dropvalue}>
                                  {v.dropvalue}
                                </option>
                              </select>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}

              <div
                className="deleteform"
                onClick={() => handleRemoveForm(index, v?.id)}
              >
                <DeleteIcon />
              </div>
              <div
                className="editform"
                onClick={() => handleEditForm(index, v?.id, v?.types)}
              >
                <EditIcon />
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default Right;
