import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import CreateFrom from "./modal/modal";
import { tokenKey } from "../../constants";
import { getAllListForm, deleteForm } from "../../services/form";
import { ToastContainer, toast } from "react-toastify";

function FormList(props) {
  const [form, setForm] = useState([]);
  const [isNewForm, setIsNewForm] = useState(false);
  const getListForm = () => {
    getAllListForm()
      .then((res) => {
        if (res?.status === 200) {
          setForm(res?.data);
        }
      })
      .catch((err) => toast.error(err.response.data));
  };

  const handleDeleteForm = (id) => {
    if (id && window.confirm("Are you sure?") === true) {
      deleteForm(id)
        .then((res) => {
          if (res?.status === 200) {
            toast.success("Deleted");
            window.location.reload();
          }
        })
        .catch((err) => toast.error(err.response.data));
    }
  };

  useEffect(() => {
    if (!tokenKey) {
      return;
    } else {
      getListForm();
    }
  }, []);

  const closeNewForm = () => {
    setIsNewForm(false);
  };
  const handleOpenNewForm = () => {
    setIsNewForm(true);
  };

  return (
    <div>
      <div style={{ padding: "10px 10px 10px 0" }}>
        <button
          className="btn btn-primary"
          onClick={handleOpenNewForm}
          style={{ marginRight: 10 }}
        >
          Create new form
        </button>
        <Link to={`/`}>
          <button className="btn btn-primary">Back to homepage</button>
        </Link>
      </div>

      {isNewForm && <CreateFrom closeNewForm={closeNewForm} />}
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Form name</th>
            <th>Action</th>
          </tr>
        </thead>
        {form.map((m, index) => (
          <tbody key={index}>
            <tr>
              <td>{index + 1}</td>
              <td>{m.formName}</td>
              <td>
                <button type="button">
                  <Link to={`/createform/${m?.id}`}>Edit</Link>
                </button>
                <button className="btn" onClick={() => handleDeleteForm(m?.id)}>
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <ToastContainer
        style={{ fontSize: 14 }}
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={true}
      />
    </div>
  );
}

export default FormList;
