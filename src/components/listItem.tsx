import React, { CSSProperties, useState } from "react";
import { FormDivider } from "@ticketio/ui-react";
import { DeleteButton } from "./deleteButton";
import {
  animated,
  useChain,
  useSpring,
  useSpringRef,
  useTransition,
} from "@react-spring/web";


interface Barcode {
  barcodes: {
    _id: Partial<string>;
    ean: string;
    firstName: string;
    lastName: string;
  };
}

const buttonStyle = {
  outline: "none",
  width: "60px",
  height: "10px",
  right: "20px",
  fontSize: "11px",
  fontWeight: 900,
  marginTop: "-7px",
  marginRight: "0px",
  display: "flex",
  alignItems: "center",
} as CSSProperties;

const ListItem = (props: Barcode) => {
  const [open, setOpen] = useState<Boolean>(false);
  const [buttonChar, setButtonChar] = useState<string>("+");
  const [itemHeight, setListItemHeight] = useState<string>("55px");
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const springRef = useSpringRef();
  const transitionRef = useSpringRef();
  const OPEN_HEIGHT = "155px";
  const COLLAPSED_HEIGHT = "55px";
  const DIRECT_ANIMATION = [0, 0.0];
  const SLOW_DELAY_ANIMATION = [0.3, 0.5];

  const leftPaddingLine = useSpring({
    config: { friction: 90, tension: 220, damping: 0.5 },
    background: "rgb(66, 47, 139)",
    opacity: isVisible ? 1 : 0,
    width: "5px",
    ref: springRef,
  });

  const expandListItem = useSpring({
    config: { friction: 20, tension: 200, damping: 0.2 },
    height: `${itemHeight}`,
    background: "white",
    width: "310px",
  });

  const transition = useTransition(isVisible, {
    from: {
      x: 0,
      y: -1000,
      marginTop: "20px",
      marginBottom: "20px",
      marginLeft: "20px",
    },
    enter: {
      x: 0,
      y: 0,
      marginTop: "20px",
      marginBottom: "20px",
      marginLeft: "20px",
    },
    leave: {
      x: 800,
      y: 0,
      marginTop: "-55px",
      marginBottom: "-20px",
      marginLeft: "20px",
    },
    config: { friction: 50, tension: 200, damping: 0 },
    trail: 20,
    ref: transitionRef,
  });

  const openListItem = () => {
    setOpen(!open);
    setButtonChar("-");
    setListItemHeight(OPEN_HEIGHT);
  };

  const collapseListItem = () => {
    setOpen(!open);
    setButtonChar("+");
    setListItemHeight(COLLAPSED_HEIGHT);
  };

  useChain(
    [springRef, transitionRef],
    isVisible ? DIRECT_ANIMATION : SLOW_DELAY_ANIMATION
  );
  return (
    <animated.div data-testid="listitem" style={leftPaddingLine} className="ui">
      {transition((styles, item) =>
        item ? (
          <animated.div
            role="inListItem"
            style={{ ...styles, ...expandListItem }}
            className="p-4 rounded shadow overflow-hidden d-flex-column ui font-weight-bolder"
          >
            {"BARCODE"}
            <button
              role="inListItem"
              data-testid="openCollapseButton"
              onClick={open ? collapseListItem : openListItem}
              style={buttonStyle}
              className="ui button secondary float-right text-center"
            >
              {buttonChar}
            </button>
            <DeleteButton
              id={props.barcodes["_id"]}
              isOpenOrClose={open ? collapseListItem : openListItem}
              setIsVisible={setIsVisible}
            />
            <FormDivider />
            <div data-testid="listItemEan" role="inListItem">
              {"EAN: " + props.barcodes?.ean}
            </div>
            <div data-testid="listItemFullname" role="inListItem">
              {"Name: " +
                props.barcodes?.firstName +
                " " +
                props.barcodes?.lastName}
            </div>
          </animated.div>
        ) : (
          <div></div>
        )
      )}
    </animated.div>
  );
};

export { ListItem };
