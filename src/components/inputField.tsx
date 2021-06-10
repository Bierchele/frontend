import React from "react";

interface Input {
  ean: string;
  firstName: string;
  lastName: string;
}
interface handleInput {
  input: Input;
  setInput: (input: Input) => void;
}

const InputField = (props: handleInput) => {
  const updateInput = (data: undefined | string): string => {
    if(data === undefined){
      return ""
    }
    return data;
  };

  return (
    <div>
      <div className="w-100 h-100 d-flex">
        <input
          value={props.input?.firstName}
          className="w-50 h-100 p-1 m-3 border rounded shadow text-center"
          placeholder="first name..."
          onChange={(e) => {
            props.setInput({ean: updateInput(props.input?.ean), firstName: e.target.value, lastName: updateInput(props.input?.lastName)});;
          }}
        ></input>
        <input
          value={props.input?.lastName}
          className="w-50 p-1 m-3 border rounded shadow text-center"
          placeholder="last name..."
          onChange={(e) => {
            props.setInput({ean: updateInput(props.input?.ean), firstName: updateInput(props.input?.firstName), lastName: e.target.value});
          }}
        ></input>
      </div>
      <input
        value={props.input?.ean}
        className="w-75 p-1 m-1 border rounded shadow text-center"
        placeholder="barcode please.."
        onChange={(e) => {
          props.setInput({ean: e.target.value, firstName: updateInput(props.input?.firstName), lastName: updateInput(props.input?.lastName)});
        }}
      ></input>
    </div>
  );
};

export default InputField;
