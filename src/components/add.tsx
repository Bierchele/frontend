import React from "react";
import { URL } from "../utility/myConfig";
import { fetchIt } from "../utility/remote-hook";
import { PostBarcode } from "../barcode.ts/barcode";
import { validate } from "class-validator";
import { toastService } from "@ticketio/ui-react";


interface Input {
  ean: string;
  firstName: string;
  lastName: string;
}

interface Barcode {
  barcodes: { ean: string }[] | undefined | string;
  setInput: (input: Input) => void;
  input: Input;
  setErrorMsg: (msg: string) => void;
}

const Add = (props: Barcode) => {
  const fetchData = async () => {
    const barcode = props.input;
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(barcode),
    };

    let code = new PostBarcode();
    Object.assign(code, barcode);

    validate(code).then(async (errors) => {
      if (errors.length > 0) {
        toastService.error({header: "Error", content: "The fields can not be empty!"})
        
        props.setInput({ ean: "", firstName: "", lastName: "" });
      } else {
        const res = await fetchIt({ url: URL + "/entry", init: init });
        if(res.message !== ''){
          toastService.error({header: "Error", content: "The fields can not be empty!"})
        }
        props.setErrorMsg(res.message);
        props.setInput({ ean: "", firstName: "", lastName: "" });
      }
    });
  };

  return (
    <div onClick={fetchData } className="ui button primary small m-2 shadow">
      A D D
    </div>
  );
};

export default Add;
