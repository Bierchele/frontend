import React, { useEffect } from "react";
import { URL } from "../utility/myConfig";
import { fetchIt } from "../utility/remote-hook";
import { BarcodeRequirements } from "../barcode.ts/barcode";
import { validate } from "class-validator";
import { toastService } from "@ticketio/ui-react";

interface Input {
  ean: string;
  firstName: string;
  lastName: string;
}

interface Barcode {
  // barcodes: { ean: string }[] | undefined | string;
  setInput: (input: Input) => void;
  input: Input;
  setErrorMsg: (msg: string) => void;
}

const AddBarcode = (props: Barcode) => {


  const showToastError = () => {
    toastService.error({
      header: "Error",
      content: "The fields can not be empty!",
    });
  };

  const checkIfBarcodeMatches = () => {
    let neededStats = new BarcodeRequirements();
    Object.assign(neededStats, props.input);
    validate(neededStats).then((errors) => {
      if (errors.length > 0) {
        return 
      }
    });
  };

  const sendBarcode = async () => {
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(props.input),
    };

    /*
      else {
        const res = await fetchIt({ url: URL + "/entry", init: init });
        if (res.message) {
          props.setErrorMsg("");
          props.setInput({ ean: "", firstName: "", lastName: "" });
          toastService.success({ header: "Succsess", content: res.message });
        }
      }
      */
  };
  props.setInput({ ean: "", firstName: "", lastName: "" });
  return (
    <div onClick={sendBarcode} className="ui button primary small m-2 shadow">
      A D D
    </div>
  );
};

export { AddBarcode };
