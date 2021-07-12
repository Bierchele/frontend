import React, { CSSProperties, useState } from "react";
import { ScannerScreen } from "./components/screen";
import { AddBarcode } from "./components/addBarcode";
import {PrintBarcodes} from "./components/printBarcodes";
import InputField from "./components/inputForm";
import "bootstrap/dist/css/bootstrap.css";
import { HeaderLogo, ToastContainer } from "@ticketio/ui-react";
import "@ticketio/ui-react/build/styles.min.css";
import "./_assets/css/core.css";

interface Barcode {
  _id: Partial<string>;
  ean: string;
  firstName: string;
  lastName: string;
}
interface Barcode extends Array<Barcode> {}

interface Input {
  ean: string;
  firstName: string;
  lastName: string;
}

const appStyle = {
  width: "380px",
  height: "auto",
  margin: "20px 0px 20px 50%",
  transform: "translateX(-50%)",
} as React.CSSProperties;

const divStyle = {
  width: "100px",
  height: "35px",
  marginLeft: "-25px",
} as CSSProperties;

const App = () => {
  const [barcodes, setBarcodes] = useState<Barcode[]>([]);
  const [input, setInput] = useState<Input>({
    ean: "",
    firstName: "",
    lastName: "",
  });
  const [errorMsg, setErrorMsg] = useState<string>("");

  return (
    <>
      <ToastContainer position="bottom-right" newestOnTop={true} />
      <div
        data-testid="app"
        style={appStyle}
        className="border rounded shadow ui form"
      >
        <div style={divStyle}>
          <HeaderLogo />
        </div>
        <div>
          <ScannerScreen barcodes={barcodes} errorMsg={errorMsg} />
        </div>
        <div className="w-100 d-flex-column ">
          <div className="w-100  text-center border p-3">
            <InputField input={input} setInput={setInput} />
          </div>
          <div className="w-100 h-50 d-flex">
            <div className=" w-50 h-75 text-center m-3">
              <AddBarcode
                setInput={setInput}
                input={input}
                setErrorMsg={setErrorMsg}
              />
            </div>
            <div className=" w-50 h-75 text-center m-3">
              <PrintBarcodes setBarcodes={setBarcodes} setErrorMsg={setErrorMsg} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
