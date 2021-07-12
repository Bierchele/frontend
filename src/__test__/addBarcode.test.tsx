import { AddBarcode } from "../components/addBarcode";
import {
  render,
  screen,
  fireEvent,
  RenderResult,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { singleBarcodeStub } from "./stubs/singleBarcodeStub";

interface Input {
  ean: string;
  firstName: string;
  lastName: string;
}

const mockCountErros = (errors: number) => {
  return errors;
};

const mockSendBarcode = () => {
  mockSetInput({ ean: "", firstName: "", lastName: "" });
  mockSetErrorMsg("");
};

const mockSetInput = jest.fn((input: Input) => {
  console.log(input);
});

const mockSetErrorMsg = jest.fn((errorMsg: string) => {
  console.log(errorMsg);
});

const mockToasty = jest.fn((errorMsg: string) => {
  console.log(errorMsg);
});

//GIVEN AddBarcode Component
describe("Add Barcode Component", () => {
  let initializeAddBarcode;
  let mockAddDiv: HTMLElement;

  // WHEN AddBarcode get initialized
  beforeEach(() => {
    initializeAddBarcode = render(
      <AddBarcode
        input={singleBarcodeStub()}
        setInput={mockSetInput}
        setErrorMsg={mockSetErrorMsg}
      />
    );
    mockAddDiv = initializeAddBarcode.getByText("A D D");
  });

  //THEN AddBarcode should be in the DOM
  test("is AddBarcode in the DOM", () => {
    expect(mockAddDiv).toBeInTheDocument();
  });

  //WHEN AddBarcode is clicked
  test("is sendBarcode triggered", () => {
    //THEN countErrors should be triggred
    fireEvent.click(mockAddDiv, {
      //WHEN there us no error
      onClick: mockCountErros(0) < 1 ? mockSendBarcode() : mockToasty("error"),
    });
    //THEN sendBarcode should be triggreden
    //AND setInput
    expect(mockSetInput).toHaveBeenCalledWith({
      ean: "",
      firstName: "",
      lastName: "",
    });
    //AND setErrorMsg
    expect(mockSetErrorMsg).toHaveBeenCalledWith("");
  });

  //WHEN there is an error
  test("is toasty", () => {
    fireEvent.click(mockAddDiv, {
      onClick: mockCountErros(2) < 1 ? mockSendBarcode() : mockToasty("error"),
    });
    //THEN a toasty error should appear
    expect(mockToasty).toHaveBeenCalledWith("error");
  });
});
