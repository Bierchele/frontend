import { toastService } from "@ticketio/ui-react";
import React from "react";
import { URL } from "../utility/myConfig";
import { fetchIt } from "../utility/remote-hook";

interface Barcode {
  ean: string;
  firstName: string;
  lastName: string;
}
interface Barcode extends Array<Barcode> {}

interface Barcodes {
  setBarcodes: (data: Barcode[] | undefined) => void;
  setErrorMsg: (msg: string) => void;
}

const Print = (props: Barcodes) => {
  const fetchData = async () => {
    const responce = await fetchIt({
      url: URL + "/entries",
      init: {},
    });

    props.setErrorMsg(responce.message);
    props.setBarcodes(await responce);
  };

  return (
    <div
      onClick={fetchData}
      className="ui button primary small m-2 float-right shadow"
    >
      P R I N T
    </div>
  );
};

export default Print;
