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

const InputForm = (props: handleInput) => {
  const checkInputType = (userInput: undefined | string): string => {
    return userInput === undefined ? (userInput = "") : userInput;
  };

  return (
    <div data-testid="inputForm">
      <div className="w-100 h-100 d-flex">
        <input
          data-testid="firstNameInput"
          value={props.input?.firstName}
          type="text"
          className="w-50 h-100 p-1 m-3 border rounded shadow text-center"
          placeholder="first name..."
          onChange={(e) => {
            props.setInput({
              ean: checkInputType(props.input?.ean),
              firstName: e.target.value,
              lastName: checkInputType(props.input?.lastName),
            });
          }}
        ></input>
        <input
          data-testid="lastNameInput"
          value={props.input?.lastName}
          type="text"
          className="w-50 p-1 m-3 border rounded shadow text-center"
          placeholder="last name..."
          onChange={(e) => {
            props.setInput({
              ean: checkInputType(props.input?.ean),
              firstName: checkInputType(props.input?.firstName),
              lastName: e.target.value,
            });
          }}
        ></input>
      </div>
      <input
        data-testid="eanInput"
        value={props.input?.ean}
        type="text"
        className="w-75 p-1 m-1 border rounded shadow text-center"
        placeholder="barcode please.."
        onChange={(e) => {
          props.setInput({
            ean: e.target.value,
            firstName: checkInputType(props.input?.firstName),
            lastName: checkInputType(props.input?.lastName),
          });
        }}
      ></input>
    </div>
  );
};

export default InputForm;
