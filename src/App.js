import "./styles.css";
import React from "react";

function Slider({ onChange, min, max }) {
  const [value, setValue] = React.useState(1);

  return (
    <React.Fragment>
      {value}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const value = Number(e.target.value);
          onChange(value);
          setValue(value);
        }}
      />
    </React.Fragment>
  );
}

function reducer(state, action) {
  if (action.type === "increment") {
    return {
      count: state.count + state.step,
      step: state.step
    };
  } else if (action.type === "decrement") {
    return {
      count: state.count - state.step,
      step: state.step
    };
  } else if (action.type === "reset") {
    return {
      count: 0,
      step: state.step
    };
  } else if (action.type === "updateStep") {
    return {
      count: state.count,
      step: action.step
    };
  } else {
    throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = React.useReducer(reducer, { count: 0, step: 1 });
  return (
    <React.Fragment>
      <Slider
        min={1}
        max={10}
        onChange={(value) =>
          dispatch({
            type: "updateStep",
            step: value
          })
        }
      />
      <h1>{state.count}</h1>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>reset</button>
    </React.Fragment>
  );
}

export default function App() {
  return (
    <>
      <Counter />
    </>
  );
}
