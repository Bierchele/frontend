import React, { CSSProperties, useState } from "react";
import { FormDivider } from "@ticketio/ui-react";

interface Barcode {
  barcodes: { ean: string; firstName: string; lastName: string } | undefined;
}

const closeStyle = {
  height: "55px",
  background: "white",
  fontWeight: "bolder",
} as CSSProperties;

const openStyle = {
  height: "150px",
  fontWeight: "bolder",
} as CSSProperties;

const buttonStyle = {
  outline: "none",
  width: "60px",
  height: "10px",
  right: "20px",
  fontSize: "11px",
  fontWeight: 900,
  marginTop: "-7px",
  display: "flex",
  alignItems: "center",
} as CSSProperties;

const ListItem = (props: Barcode) => {
  const [open, setOpen] = useState<Boolean>(false);
  const [buttonChar, setButtonChar] = useState<string>("+");

  const openClose = () => {
    setOpen(!open);
    open ? setButtonChar("+") : setButtonChar("-");
  };

  return (
    <div
      style={open ? openStyle : closeStyle}
      className="mt-3 mb-3 p-4 rounded shadow-sm w-100 overflow-hidden d-flex-column ui"
    >
      {"BARCODE"}

      <button
        onClick={openClose}
        style={buttonStyle}
        className="ui button secondary float-right text-center"
      >
        {buttonChar}
      </button>
      <FormDivider />
      <div className="">
        {props.barcodes?.firstName + " " + props.barcodes?.lastName}
      </div>
      <div className="">{"EAN: " + props.barcodes?.ean}</div>
    </div>
  );
};

export { ListItem };
