import React from "react";
import "./right.css";
import { DeleteIcon, EditIcon } from "../../icons/icon";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteField } from "../../services/fields";
function Right(props) {
  // const closeSession = () => {
  //   setSesstion(!sesstion);
  // };
  const {
    // setSesstion,
    openSession,
    sesstion,
    value,
    setAllValue,
    handleEditForm,
    toggleEditIcon,
  } = props;
  const handleRemoveForm = (index, id) => {
    if (id && window.confirm("Are you sure?") === true) {
      deleteField(id)
        .then((res) => {
          if (res?.status === 200) {
            toast.success("deleted");
            window.location.reload();
          }
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
          <button
            className={
              !sesstion ? "btn btn-outline-primary" : "btn btn-outline-danger"
            }
            onClick={openSession}
          >
            {!sesstion ? "Add session" : "Remove session"}
          </button>
        </div>
      )}
      <div className="dropzone"></div>
      {(sesstion || value.length > 0) && (
        <section>
          <div className="top_sesssion">
            <div className="session">Create something</div>
            {/* {value.length <= 0 && (
              <div onClick={closeSession} style={{ cursor: "pointer" }}>
                <DeleteIcon />
              </div>
            )} */}
          </div>
          {value?.map((v, index) => (
            <div className="sesstion_content" key={index}>
              {v?.types === "texts" && v?.label ? (
                <div key={index}>
                  <label style={{ marginLeft: "5%" }}>
                    {v.label} {v.keybox === true ? "*" : ""}
                  </label>
                  <input
                    style={{ width: "90%", margin: "0 auto" }}
                    type="text"
                    className="form-control"
                    name="body"
                    defaultValue={v.values}
                    disabled
                  />
                </div>
              ) : (
                <>
                  {v?.types === "area" && v?.label ? (
                    <div key={index}>
                      <label style={{ marginLeft: "5%" }}>
                        {v?.label} {v.keybox === true ? "*" : ""}
                      </label>
                      <textarea
                        style={{ width: "90%", margin: "0 auto" }}
                        // type="text"
                        className="form-control"
                        name="body"
                        defaultValue={v.values}
                        rows="4"
                        cols="100"
                        disabled
                      ></textarea>
                    </div>
                  ) : (
                    <>
                      {v?.types === "num" && v?.label ? (
                        <div key={index}>
                          <label style={{ marginLeft: "5%" }}>
                            {v.label} {v.keybox === true ? "*" : ""}
                          </label>
                          <input
                            style={{ width: "90%", margin: "0 auto" }}
                            type="number"
                            className="form-control"
                            name="body"
                            // value={v.values}
                            defaultValue={v.values}
                            disabled
                          />
                        </div>
                      ) : (
                        <>
                          {v?.types === "drop" && v?.label && (
                            <div key={index}>
                              <label style={{ marginLeft: "5%" }}>
                                {v.label} {v.keybox === true ? "*" : ""}
                              </label>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                style={{ width: "90%", margin: "0 auto" }}
                                defaultValue={v.dropvalue}
                              >
                                <option disabled>Please choose</option>
                                <option value={v.dropvalue}>
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
              {toggleEditIcon && (
                <div
                  className="editform"
                  onClick={() => handleEditForm(index, v?.id, v?.types)}
                >
                  <EditIcon />
                </div>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default React.memo(Right);
