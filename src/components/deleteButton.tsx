import React, { CSSProperties } from "react";
import { fetchIt } from "../utility/remote-hook";
import { URL } from "../utility/myConfig";
import { toastService } from "@ticketio/ui-react";

interface IDeleteButton {
  id: string;
  isOpenOrClose: () => void;
  setIsVisible: (visibilty: boolean) => void;
}

const delButtonStyle = {
  outline: "none",
  width: "auto",
  height: "10px",
  right: "20px",
  fontSize: "7px",
  fontWeight: 900,
  marginTop: "95px",
  marginRight: "-65px",
  display: "flex",
  alignItems: "center",
  alignSelf: "end",
} as CSSProperties;

const DeleteButton = (props: IDeleteButton) => {
  const deleteBarcode = async () => {
    const responce = await fetchIt({
      url: URL + "/entry" + props.id,
      init: init,
    });
    await deleteAnimation(responce.count.deletedCount, responce.message);
  };

  const deleteAnimation = async (dbAnswer: number, message: string) => {
    if (dbAnswer === 1) {
      props.isOpenOrClose();
      props.setIsVisible(false);
      toastService.success({ header: "Succsess", content: message });
    } else if (dbAnswer === 0) {
      toastService.error({
        header: "Error",
        content: "This barcode was already deleted",
      });
    }
  };
  const init = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  return (
    <button
      data-testid="deleteButton"
      onClick={deleteBarcode}
      className="ui button red float-right text-center"
      style={delButtonStyle}
    >
      Delete
    </button>
  );
};

export { DeleteButton };

