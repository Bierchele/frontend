import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { DeleteButton } from "../components/deleteButton";
import { mockDeleteApi } from "../mocks/mockApis";


//GIVEN DeleteButton component
describe("deleteButton", () => {
  let mockDeleteButton: HTMLElement;
  let mockSetIsVisible: any;
  let mockIsOpenOrClose: any;
  let mockDeleteBarcode: any;

  // WHEN DeleteButton gets initialized
  beforeEach(() => {
    render(
      <DeleteButton
        id={"1"}
        setIsVisible={jest.fn()}
        isOpenOrClose={jest.fn()}
      />
    );
    mockDeleteButton = screen.getByText("Delete");
    mockSetIsVisible = jest.fn(() => {
      console.log("not visible");
    });
    mockIsOpenOrClose = jest.fn(() => {
      console.log("not open");
    });
    mockDeleteBarcode = jest.fn(() => {
      mockIsOpenOrClose();
      mockSetIsVisible();
    });
  });

  //THEN DeleteButton should be in the DOM
  test("is deleteButton in DOM", () => {
    expect(mockDeleteButton).toBeInTheDocument();
    expect(mockDeleteButton.innerHTML).toEqual("Delete");
  });

  test("click functionality", () => {
    fireEvent.click(mockDeleteButton, { onClick: mockDeleteBarcode() });
    expect(mockIsOpenOrClose).toHaveBeenCalled();
    expect(mockSetIsVisible).toHaveBeenCalled();
  });
});
