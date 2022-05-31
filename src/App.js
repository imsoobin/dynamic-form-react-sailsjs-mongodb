import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./App.css";
import Left from "./components/left/left";
import Right from "./components/right/right";
import Modal from "./modal/modal";
import { useNavigate } from "react-router-dom";

function App() {
  let navigate = useNavigate();
  const [close, setClose] = useState(false);
  const [sesstion, setSesstion] = useState(false);
  const [isDrop, setIsDrop] = useState(false);
  const [value, setValue] = useState([]);
  const [allValue, setAllValue] = useState([]);
  const [type, setType] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [test, setTest] = useState([]);
  const [indexs, setIndex] = useState(10);
  const [idField, setIdField] = useState();
  const paramsId = useParams();
  const toggleModal = (index) => {
    if (index === "drop") {
      setValue("");
      setIsDrop(true);
      setType("drop");
      setIsEdit(false);
    } else if (index === "textarea") {
      setValue("");
      setType("area");
      setIsEdit(false);
    } else if (index === "text") {
      setValue("");
      setType("texts");
      setIsEdit(false);
    } else if (index === "number") {
      setValue("");
      setType("num");
      setIsEdit(false);
    }
    setClose(!close);
  };

  const addSessionToUse = () => {
    alert("PLease add session to access");
  };

  const openSession = () => {
    setSesstion(!sesstion);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (isEdit) {
      const name = e.target.name;
      const val = e.target.value;
      setTest((prev) => {
        return {
          ...prev,
          [name]: val,
        };
      });
    }
    setValue((values) => ({ ...values, [name]: value, owner: paramsId?.id }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setValue("");
    if (allValue[indexs]) {
      setAllValue((prev) => prev.filter((item) => item !== prev[indexs]));
    }
    setAllValue((prev) => [...prev, value]);
    if (isEdit) {
      axios
        .post(`http://localhost:1337/field/update/${idField}`, value)
        .then((res) => alert("updated"))
        .catch((err) => alert(`Error ${err}`));

      window.location.reload();
    }
    setClose(false);
  };

  const handleEditForm = (index, id, types) => {
    if (types === "drop") {
      setType("drop");
      setIsDrop(true);
    }
    setIdField(id);
    setClose(true);
    setIsEdit(true);
    setIndex(index);
    setTest(allValue[index]);
  };

  const handleGetAllListForm = () => {
    if (allValue.length < 1) {
      alert("Empty field item ");
      return;
    }
    axios
      .get(`http://localhost:1337/form/${paramsId?.id}`)
      .then((res) => {
        if (res?.data?.field?.length >= 1) {
          alert("please create a new form to add item");
          return navigate("/");
        } else {
          axios
            .post("http://localhost:1337/field/add", allValue, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((res) => alert("added success"))
            .catch((err) => alert("error", err));
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:1337/form/${paramsId?.id}`)
      .then((res) => {
        if (res?.data?.field?.length > 0) {
          setAllValue(res?.data?.field);
        }
      })
      .catch((err) => console.log(err));
  }, [paramsId?.id]);

  return (
    <div className="App">
      <div className="app_header">
        <p>DYNAMIC FORM</p>
        <button onClick={handleGetAllListForm}>Add field</button>
        <Link to={`/formdetails/${paramsId?.id}`}>View form details</Link>
        <Link to={`/`}>View form</Link>
      </div>

      <div className="containers">
        <Left
          toggleModal={toggleModal}
          sesstion={sesstion}
          addSessionToUse={addSessionToUse}
          value={allValue}
        />
        <Right
          openSession={openSession}
          sesstion={sesstion}
          setSesstion={setSesstion}
          value={allValue}
          setAllValue={setAllValue}
          setClose={setClose}
          handleEditForm={handleEditForm}
          // idField={idField}
        />
      </div>
      {close && (
        <Modal
          close={close}
          setClose={setClose}
          isDrop={isDrop}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          value={value}
          type={type}
          test={test}
          isEdit={isEdit}
          setTest={setTest}
          setIsDrop={setIsDrop}
        />
      )}
    </div>
  );
}

export default App;
