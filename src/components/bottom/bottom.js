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
      .catch((err) => alert(err));
  }, [paramId?.id]);

  return (
    <div className="bottom_a4">
      <div className="bottom">
        <button className="btn btn-warning">
          <Link to={`/createform/${paramId?.id}`} className="back">
            Back create form
          </Link>
        </button>

        <div>
          <h2>Your form</h2>
        </div>
        {data?.map((m, index) => (
          <div key={index}>
            {m?.types === "texts" ? (
              <div key={index} className="input">
                <label>{m?.label || m?.fieldName}</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={m?.values}
                  // disabled
                />
              </div>
            ) : (
              <>
                {m?.types === "num" ? (
                  <div key={index} className="input">
                    <label>{m?.label || m?.fieldName}</label>
                    <input
                      type="number"
                      className="form-control"
                      name="body"
                      placeholder={m?.values}
                      // disabled
                    />
                  </div>
                ) : (
                  <>
                    {m?.types === "area" ? (
                      <div key={index} className="input">
                        <label>{m?.label || m?.fieldName}</label>
                        <textarea
                          className="form-control"
                          // value={m.values}
                          placeholder={m?.values}
                          rows="4"
                          cols="100"
                          // disabled
                        ></textarea>
                      </div>
                    ) : (
                      <>
                        {m?.types === "drop" && (
                          <div key={index} className="input">
                            <label>{m.label}</label>
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
    </div>
  );
}

export default Bottom;
