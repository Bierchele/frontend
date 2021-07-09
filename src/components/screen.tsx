import { animated, config, useSpring } from "@react-spring/web";
import React, { CSSProperties, useState } from "react";
import { ListItem } from "./listItem";

interface Barcode {
  barcodes:
    | {
        _id: Partial<string>;
        ean: string;
        firstName: string;
        lastName: string;
      }[]
    | undefined;
  errorMsg: string;
}
const screenStyle = {
  height: "340px",
  width: "350px",
  position: "relative",
  overflowY: "auto",
  overflowX: "hidden",
} as CSSProperties;

const ScannerScreen = (props: Barcode) => {
  return (
    <div  data-testid="screen" className="m-3 mb-5 pt-2" style={screenStyle}>
      {props.errorMsg?.length > 0 ? (
        <div data-testid="error"  className="text-center ui m-3 p-2 rounded">{props.errorMsg}</div>
      ) : (
        <div>
          {props.barcodes?.map((barcode, i) => {
            return <ListItem key={i} barcodes={barcode} />;
          })}
        </div>
      )}
    </div>
  );
};

export {ScannerScreen};
