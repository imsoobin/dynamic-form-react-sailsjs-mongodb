import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import CreateFrom from "./modal/modal";

const url = "http://localhost:1337/form/";
function FormList(props) {
  const [form, setForm] = useState([]);
  const [isNewForm, setIsNewForm] = useState(false);
  const getListForm = () => {
    axios
      .get(url)
      .then((res) => setForm(res?.data))
      .catch((err) => console.log(err));
  };

  const handleDeleteForm = (id) => {
    if (id && window.confirm("Are you sure?") === true) {
      axios
        .delete(`${url}deleteForm/${id}`)
        .then((res) => {
          alert("Deleted");
          window.location.reload();
        })
        .catch((err) => alert(err));
    }
  };

  useEffect(() => {
    getListForm();
  }, []);

  const closeNewForm = () => {
    setIsNewForm(false);
  };
  const handleOpenNewForm = () => {
    setIsNewForm(true);
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleOpenNewForm}>
        Create new form
      </button>
      {isNewForm && <CreateFrom closeNewForm={closeNewForm} />}
      <table>
        <tr>
          <th>STT</th>
          <th>Form name</th>
          <th>Action</th>
        </tr>
        {form.map((m, index) => (
          <tr key={index}>
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
        ))}
      </table>
    </div>
  );
}

export default FormList;
