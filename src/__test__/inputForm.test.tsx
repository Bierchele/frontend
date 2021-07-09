import { render, screen, fireEvent} from "@testing-library/react";
import InputField from "../components/inputForm";
import { singleBarcodeStub } from "./stubs/singleBarcodeStub";
import "@testing-library/jest-dom";

// GIVEN InputField component
describe("InputField", () => {
  let mockSetInput: any;
  let renderedInputField;
  let mockInputForm: HTMLElement;
  let mockFirstNameField: HTMLElement;
  let mockLastNameField: HTMLElement;
  let mockEanField: HTMLElement;

  // WHEN InputField gets initialized
  beforeEach(() => {
    mockSetInput = jest.fn(() => {
      return singleBarcodeStub();
    });
    renderedInputField = render(
      <InputField input={singleBarcodeStub()} setInput={mockSetInput} />
    );
    mockInputForm = renderedInputField.getByTestId("inputForm");
    mockFirstNameField = screen.getByTestId("firstNameInput");
    mockLastNameField = screen.getByTestId("lastNameInput");
    mockEanField = screen.getByTestId("eanInput");
  });

  // THEN InputForm should be in the DOM
  test("is InputForm renderd", () => {
    expect(mockInputForm).toBeInTheDocument();
  });

  // THEN InputForm should have 3 inputFields
  test("Are inputFields rendered", () => {
    expect(mockFirstNameField).toBeInTheDocument();
    expect(mockLastNameField).toBeInTheDocument();
    expect(mockEanField).toBeInTheDocument();
  });

  //WHEN the user input changes
  test("change Ean value if input is given", () => {
    fireEvent.change(mockEanField, { target: { value: singleBarcodeStub() } });
    //THEN setInput should be called
    expect(mockSetInput).toHaveBeenCalled();
    // AND input values should equal given stub value
    expect(mockEanField.value).toEqual("15135");
  });

  //WHEN the user input changes
  test("change  firstName value if input is given", () => {
    fireEvent.change(mockFirstNameField, { target: { value: singleBarcodeStub() } });
    //THEN setInput should be called
    expect(mockSetInput).toHaveBeenCalled();
    // AND input values should equal given stub value
    expect(mockFirstNameField.value).toEqual("Michele");
  });

  //WHEN the user input changes
  test("change lastName value if input is given", () => {
    fireEvent.change(mockLastNameField, { target: { value: singleBarcodeStub() } });
    //THEN setInput should be called
    expect(mockSetInput).toHaveBeenCalled();
    // AND input values should equal given stub value
    expect(mockLastNameField.value).toEqual("Ayadi");
  });
});
