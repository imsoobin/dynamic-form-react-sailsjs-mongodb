import "./App.css";
import axios from "axios";
import Modal from "./modal/modal";
import Left from "./components/left/left";
import Right from "./components/right/right";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

function App() {
  // let navigate = useNavigate();
  const paramsId = useParams();
  const [type, setType] = useState("");
  const [test, setTest] = useState([]);
  const [value, setValue] = useState([]);
  // const [indexs, setIndex] = useState(10);
  const [idField, setIdField] = useState();
  const [close, setClose] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDrop, setIsDrop] = useState(false);
  const [allValue, setAllValue] = useState([]);
  const [sesstion, setSesstion] = useState(false);
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
    toast.warning("PLease add session to access");
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
    // if (allValue[indexs]) {
    //   setAllValue((prev) => prev.filter((item) => item !== prev[indexs]));
    // }
    setAllValue((prev) => [...prev, value]);
    if (isEdit) {
      axios.get(`http://localhost:1337/form/${paramsId?.id}`).then((res) => {
        if (res?.data?.field?.length <= 0) {
          toast.warning("You have no added field to update item");
          return;
        } else {
          axios
            .post(`http://localhost:1337/field/update/${idField}`, value)
            .then((res) => {
              toast.success("updated");
              window.location.reload();
            })
            .catch((err) => toast.error(`Error ${err}`));
        }
      });
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
    // setIndex(index);
    setTest(allValue[index]);
  };

  const handleGetAllListForm = () => {
    if (allValue.length < 1) {
      toast.warning("Empty field item ");
      return;
    }
    axios
      .get(`http://localhost:1337/form/${paramsId?.id}`)
      .then((res) => {
        if (res?.data?.field?.length >= 1) {
          toast.warning(
            "This form already exist. Please create a new form to add field items"
          );
          // navigate("/");
          return;
        } else {
          axios
            .post("http://localhost:1337/field/add", allValue, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((res) => {
              toast.success("added success");
              window.location.reload();
            })
            .catch((err) => toast.error("error", err));
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
        <h3>DYNAMIC FORM</h3>
        <div>
          <button
            onClick={handleGetAllListForm}
            className="btn btn-outline-success"
          >
            Add field
          </button>
          <Link to={`/formdetails/${paramsId?.id}`}>
            <button className="btn btn-outline-success">
              View form details
            </button>
          </Link>
          <Link to={`/`}>
            <button className="btn btn-outline-success">View form</button>
          </Link>
        </div>
      </div>

      <div className="containers">
        <Left
          toggleModal={toggleModal}
          sesstion={sesstion}
          addSessionToUse={addSessionToUse}
          value={allValue}
          setClose={setClose}
          setValue={setValue}
        />
        <Right
          openSession={openSession}
          sesstion={sesstion}
          setSesstion={setSesstion}
          value={allValue}
          setAllValue={setAllValue}
          setClose={setClose}
          handleEditForm={handleEditForm}
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
      <ToastContainer
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

export default App;
