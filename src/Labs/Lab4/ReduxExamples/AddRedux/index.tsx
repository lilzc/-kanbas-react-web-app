import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add } from "./addReducer";

export default function AddRedux() {
  const [a, setA] = useState(12);
  const [b, setB] = useState(23);
  const sum = useSelector((state: any) => state.addReducer.sum);
  const dispatch = useDispatch();

  return (
    <div className="w-25" id="wd-add-redux">
      <h1>Add Redux</h1>
      <h2>{a} + {b} = {sum}</h2>
      <input
        type="number"
        defaultValue={a}
        onChange={(e) => setA(parseInt(e.target.value))}
        className="form-control"
      />
      <input
        type="number"
        defaultValue={b}
        onChange={(e) => setB(parseInt(e.target.value))}
        className="form-control"
      />
      <button
        className="btn btn-primary"
        onClick={() => dispatch(add({ a, b }))}
        id="wd-add-redux-click"
      >
        Add Redux
      </button>
      <hr />
    </div>
  );
}
