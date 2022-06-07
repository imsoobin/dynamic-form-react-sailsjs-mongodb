import "./App.css";

import Modal from "./modal/modal";
import Left from "./components/left/left";
import Right from "./components/right/right";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { WARNINGS } from "./constants";
import { getListFormId } from "./services/form";
import { addFields, getFieldsId, updateFields } from "./services/fields";

function App() {
  const addMoreArr = [];
  const paramsId = useParams();
  const [type, setType] = useState("");
  const [test, setTest] = useState();
  const [value, setValue] = useState();
  const [idField, setIdField] = useState("");
  const [tests, setTests] = useState(false);
  const [close, setClose] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDrop, setIsDrop] = useState(false);
  const [allValue, setAllValue] = useState([]);
  const [sesstion, setSesstion] = useState(false);
  const [addMore, setAddMore] = useState([]);
  const [toggleEditIcon, setToggleEditIcon] = useState(false);

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

  const checkboxModal = (e) => {
    setTests(e.target.checked);
  };

  const addSessionToUse = () => {
    toast.warning(WARNINGS.ADD_SESSION);
  };

  const openSession = () => {
    setSesstion(!sesstion);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (isEdit) {
      setTest((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
    setValue((values) => ({
      ...values,
      [name]: value,
      owner: paramsId?.id,
      keybox: tests,
    }));
  };
  const handleSubmit = (e) => {
    // if (allValue[indexs]) {
    //   setAllValue((prev) => prev.filter((item) => item !== prev[indexs]));
    // }
    e.preventDefault();
    setValue("");
    addMoreArr.push(value);
    setAddMore(addMoreArr);
    setAllValue((prev) => [...prev, value]);
    if (isEdit) {
      getListFormId(paramsId?.id).then((res) => {
        if (res?.status === 200) {
          if (res?.data?.field?.length <= 0) {
            toast.warning(WARNINGS.ADD_TO_UPDATE);
            return;
          } else {
            updateFields(idField, value)
              .then((res) => {
                if (res?.status === 200) {
                  toast.success("updated");
                  window.location.reload();
                }
              })
              .catch((err) => alert(err));
          }
        }
      });
    }
    setTests(false);
    setClose(false);
  };
  const handleEditForm = (index, id, types) => {
    if (types === "drop") {
      setType("drop");
      setIsDrop(true);
    }

    getFieldsId(id)
      .then((res) => {
        if (res?.status === 200) {
          setTests(res?.data?.keybox);
        }
      })
      .catch((err) => alert(err));

    setIdField(id);
    setClose(true);
    setIsEdit(true);
    setTest(allValue[index]);
  };
  const handleGetAllListForm = () => {
    if (allValue.length < 1) {
      toast.warning(WARNINGS.EMPTY_ITEM);
      return;
    }
    getListFormId(paramsId?.id).then((res) => {
      if (res?.status === 200) {
        if (addMore.length === 0) {
          toast.warning(WARNINGS.FORM_EXITS);
          return;
        } else if (res?.data?.field?.length >= 1) {
          addFields(addMore)
            .then((res) => {
              if (res?.status === 201) {
                toast.success("added more success");
                window.location.reload();
              }
            })
            .catch((err) => toast.error("error", err.response.data));
        } else {
          addFields(allValue)
            .then((res) => {
              if (res?.status === 201) {
                toast.success("added success");
                window.location.reload();
              }
            })
            .catch((err) => toast.error("error", err.response.data));
        }
      }
    });
  };

  useEffect(() => {
    getListFormId(paramsId?.id)
      .then((res) => {
        if (res?.status === 200) {
          if (res?.data?.field?.length > 0) {
            setAllValue(res?.data?.field);
            setToggleEditIcon(true);
          }
        }
      })
      .catch((err) => toast.error(err));
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
          <Link to={`/formlist`}>
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
          toggleEditIcon={toggleEditIcon}
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
          checkboxModal={checkboxModal}
          tests={tests}
        />
      )}
      <ToastContainer
        style={{ fontSize: "13px" }}
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
