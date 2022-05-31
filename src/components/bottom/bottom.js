import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./bottom.css";

function Bottom(props) {
  const [data, setData] = useState([]);
  const paramId = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:1337/form/${paramId?.id}`)
      .then((res) => setData(res?.data?.field))
      .catch((err) => console.log(err));
  }, [paramId?.id]);

  return (
    <div className="bottom">
      <Link to={`/createform/${paramId?.id}`}>Back create form</Link>
      {data?.map((m, index) => (
        <div key={index}>
          {m?.types === "texts" ? (
            <div key={index}>
              <label style={{ marginLeft: "5%" }}>
                {m?.label || m?.fieldName}
              </label>
              <input
                style={{ width: "50%" }}
                type="text"
                className="form-control"
                placeholder={m?.values}
                disabled
              />
            </div>
          ) : (
            <>
              {m?.types === "num" ? (
                <div key={index}>
                  <label style={{ marginLeft: "5%" }}>
                    {m?.label || m?.fieldName}
                  </label>
                  <input
                    style={{ width: "50%" }}
                    type="number"
                    className="form-control"
                    name="body"
                    placeholder={m?.values}
                    disabled
                  />
                </div>
              ) : (
                <>
                  {m?.types === "area" ? (
                    <div key={index}>
                      <label style={{ marginLeft: "5%" }}>
                        {m?.label || m?.fieldName}
                      </label>
                      <textarea
                        className="form-control"
                        value={m.values}
                        rows="4"
                        cols="100"
                        disabled
                      ></textarea>
                    </div>
                  ) : (
                    <>
                      {m?.types === "drop" && (
                        <div key={index}>
                          <label style={{ marginLeft: "5%" }}>{m.label}</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option disabled>Please choose</option>
                            <option selected value={m?.dropvalue}>
                              {m?.dropvalue}
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
        </div>
      ))}
    </div>
  );
}

export default Bottom;
