import React, { CSSProperties, useState } from "react";
import { HeaderTitle, Headline } from "@ticketio/ui-react";


interface Barcode {
  barcodes: { ean: string; firstName: string; lastName: string } | undefined;
}

const closeStyle = {
  height: "55px",
};

const openStyle = {
  height: "130px",
};

const buttonStyle = {
  outline: "none",
  width: "60px",
  height: "15px",
  right: "20px",
  fontSize: "11px",
  fontWeight: "bolder",
  marginTop: "-20px",
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
      className="mt-3 mb-3 p-3 rounded shadow-sm w-100 overflow-hidden d-flex-column ui"
    >
      <HeaderTitle>Barcode</HeaderTitle>
      <button
        onClick={openClose}
        style={buttonStyle}
        className="ui button primary float-right text-center"
      >
        {buttonChar}
      </button>
      <div className="mt-3">{"EAN: " + props.barcodes?.ean}</div>
      <div className="mt-2">
        {"Name: " + props.barcodes?.firstName + " " + props.barcodes?.lastName}
      </div>
    </div>
  );
};

export { ListItem };
