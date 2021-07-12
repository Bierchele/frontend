import "@testing-library/jest-dom";

import { PrintBarcodes } from "../components/printBarcodes";

import { fireEvent, render} from "@testing-library/react";

import { barcodeListStub } from "./stubs/barcodeListStub";

const mockFetchData = () => {
  mockSetBarcodes(barcodeListStub());
  mockSetErrorMsg("error");
};

const mockSetBarcodes = jest.fn((barcodes) => {
  console.log(barcodes);
});
const mockSetErrorMsg = jest.fn((errorMsg: string) => {
  console.log(errorMsg);
});

//GIVEN printBarcodes Component
describe("printBarcodes", () => {
  let initializedPrintBarcodes;
  let mockPrintBarcodes: HTMLElement;

  //WHEN PrintBarcodes get initialized
  beforeEach(() => {
    initializedPrintBarcodes = render(
      <PrintBarcodes
        setBarcodes={mockSetBarcodes}
        setErrorMsg={mockSetErrorMsg}
      />
    );
    mockPrintBarcodes = initializedPrintBarcodes.getByText("P R I N T");
  });

  //THEN PrintBarcodes should be in the DOM
  test("is PrintBracodes in the DOM", () => {
    expect(mockPrintBarcodes).toBeInTheDocument();
  });

  //WHEN PrintBarcodes get clicked
  test("Are functions inside PrintBarcodes triggered", () => {
    fireEvent.click(mockPrintBarcodes, { onClick: mockFetchData() });

    //THEN setErrorMsg should be called
    expect(mockSetErrorMsg).toBeCalledWith("error");

    //AND setErrorMsg should be called
    expect(mockSetBarcodes).toBeCalledWith(barcodeListStub());
  });
});
