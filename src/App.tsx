import React, { useState } from "react";
import ScannerScreen from "./components/screen";
import Add from "./components/add";
import Print from "./components/print";
import InputField from "./components/inputField";
import "bootstrap/dist/css/bootstrap.css";
import { HeaderLogo, Headline, ToastContainer } from "@ticketio/ui-react";
import "@ticketio/ui-react/build/styles.min.css";


interface Barcode {
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
  width: "360px",
  height: "auto",
  margin: "20px 0px 20px 50%",
  transform: "translateX(-50%)",
} as React.CSSProperties;

const App = () => {
  const [barcodes, setBarcodes] = useState<Barcode[]>();
  const [input, setInput] = useState<Input>({
    ean: "",
    firstName: "",
    lastName: "",
  });
  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  return (
    <>
      <ToastContainer position="bottom-right" newestOnTop={true} />
      <div style={appStyle} className="border rounded shadow ui form light  top-bar-logo ">
        <Headline title="haze" />
        <ScannerScreen barcodes={barcodes} errorMsg={errorMsg} />
        <div className="w-100 d-flex-column ">
          <div className="w-100  text-center">
            <InputField input={input} setInput={setInput} />
          </div>
          <div className="w-100 h-50 d-flex">
            <div className=" w-50 h-75 text-center m-3">
              <Add
                barcodes={barcodes}
                setInput={setInput}
                input={input}
                setErrorMsg={setErrorMsg}
              />
            </div>
            <div className=" w-50 h-75 text-center m-3">
              <Print setBarcodes={setBarcodes} setErrorMsg={setErrorMsg} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
