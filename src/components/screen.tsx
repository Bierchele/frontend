import { Headline } from "@ticketio/ui-react";
import React, { CSSProperties } from "react";
import {ListItem} from "./listItem"

interface Barcode {
  barcodes: { ean: string, firstName: string, lastName: string }[] | undefined;
  errorMsg: string | undefined;
}
const screenStyle = {
  height: "370px",
  width: "340px",
  position: "relative",
} as CSSProperties;



const ScannerScreen = (props: Barcode) => { 
  return (
    <div style={screenStyle} className=" overflow-auto border ui">
      {props.errorMsg ? (
        <div className="text-center ui m-3 p-2 rounded">
          {props.errorMsg}
        </div>
      ) : (
        <div>
          {props.barcodes?.map((barcode, i) => {
            return <ListItem  key={i} barcodes={barcode}/>
          })}
        </div>
      )}
    </div>
  );
};

export default ScannerScreen;
 