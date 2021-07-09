import React from "react";
import { URL } from "../utility/myConfig";
import { fetchIt } from "../utility/remote-hook";

interface Barcode {
  _id: Partial<string>;
  ean: string;
  firstName: string;
  lastName: string;
}
interface Barcode extends Array<Barcode> {}

interface Barcodes {
  setBarcodes: (data: Barcode[]) => void;
  setErrorMsg: (msg: string) => void;
}

const Print = (props: Barcodes) => {
  const fetchData = async () => {
    const res = await fetchIt({
      url: URL + "/entries",
      init: {},
    });
    props.setErrorMsg(res.message);
    props.setBarcodes(await res);
  };

  return (
    <div
      onClick={fetchData}
      className="ui button primary small m-2 float-right shadow">
       P R I N T
    </div>
  );
};

export default Print;
