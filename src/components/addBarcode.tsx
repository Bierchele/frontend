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
  const countValidationErros = (): number => {
    let errorLength = 0;
    let neededStats = new BarcodeRequirements();
    Object.assign(neededStats, props.input);
    validate(neededStats).then((errors) => {
      errorLength = errors.length;
    });
    return errorLength;
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
    const res = await fetchIt({ url: URL + "/entry", init: init });
    showSuccess(res);
  };

  const showToastError = () => {
    toastService.error({
      header: "Error",
      content: "The fields can not be empty!",
    });
  };

  const showSuccess = (res: any) => {
    if (res.message) {
      toastService.success({ header: "Succsess", content: res.message });
      props.setErrorMsg("");
      props.setInput({ ean: "", firstName: "", lastName: "" });
    }
  };

  return (
    <div
      onClick={countValidationErros() < 1 ? sendBarcode : showToastError}
      className="ui button primary small m-2 shadow"
    >
      A D D
    </div>
  );
};

export { AddBarcode };
