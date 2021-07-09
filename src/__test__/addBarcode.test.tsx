import { AddBarcode } from "../components/addBarcode";
import {
  render,
  screen,
  fireEvent,
  RenderResult,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { singleBarcodeStub } from "./stubs/singleBarcodeStub";

/*
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);
*/
describe("Add Barcode Component", () => {
  let initializeAddBarcode;
  let mockAddDiv: HTMLElement;

  beforeEach(() => {
    initializeAddBarcode = render(
      <AddBarcode
        input={singleBarcodeStub()}
        setInput={jest.fn()}
        setErrorMsg={jest.fn()}
      />
    );

    mockAddDiv = initializeAddBarcode.getByText("A D D");
  });

  test("is AddBarcode in the DOM", () => {
    expect(mockAddDiv).toBeInTheDocument();
  });


});
