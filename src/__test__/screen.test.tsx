import { render, screen, cleanup, within } from "@testing-library/react";
import { ScannerScreen } from "../components/screen";
import { barcodeListStub } from "./stubs/barcodeListStub";

import "@testing-library/jest-dom";

// GIVEN the ScannerScreen component with the props of Barcode List and  an empty errorMsg
describe("ScannerScreen", () => {
  let barcodeAppScreen: HTMLElement;
  let renderedScreen;

  beforeEach(() => {
    renderedScreen = render(
      <ScannerScreen barcodes={barcodeListStub()} errorMsg={""} />
    );
    barcodeAppScreen = renderedScreen.getByTestId("screen");
  });
  
  test("render ScannerScreen", () => {
    // THEN ScannerScreen should be rendered
    expect(barcodeAppScreen).toBeInTheDocument();
  });

  // THEN ListItems should be rendered
  test("ScannerScreen should contains ListItems", () => {
    const listItemsInScreen =
      within(barcodeAppScreen).getAllByTestId("listitem");
    expect(listItemsInScreen.length).toEqual(4);
  });

  // GIVEN errorMsg is not empty
  test("Screen with errorMsg", () => {
    renderedScreen = render(
      <ScannerScreen barcodes={barcodeListStub()} errorMsg={"An Error"} />
    );

    // THEN error message should be rendered
    let errorMsg = screen.getByTestId("error");
    expect(errorMsg).toBeInTheDocument();

    // THEN error message elements text shoud equal errorMsg prop
    expect(errorMsg).toHaveTextContent("An Error");
  });
});
