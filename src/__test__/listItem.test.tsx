import "@testing-library/jest-dom";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { ListItem } from "../components/listItem";
import { singleBarcodeStub } from "./stubs/singleBarcodeStub";

// GIVEN ListItem component
describe("ListItem", () => {
  let renderedListItem;
  let mockListItem: HTMLElement;
  let elementsWithInListItem;
  let mockEanDiv: HTMLElement;
  let mockFullNameDiv: HTMLElement;
  let stubBarcode = singleBarcodeStub();
  let openCollapseButton: any;

  // WHEN listItem gets initialized
  beforeEach(() => {
    renderedListItem = render(<ListItem barcodes={stubBarcode} />);
    mockListItem = renderedListItem.getByTestId("listitem");
    mockEanDiv = renderedListItem.getByTestId("listItemEan");
    mockFullNameDiv = renderedListItem.getByTestId("listItemFullname");
    openCollapseButton = renderedListItem.getByTestId('openCollapseButton');
    
  });

  //THEN ListItem shouled be rendered
  test("is listItem in the DOM", () => {
    expect(mockListItem).toBeInTheDocument();
  });

  //THEN Elemets within ListItem should be renderd
  test("Are Element within listItem in the Dom", () => {
    elementsWithInListItem = within(mockListItem).getAllByRole("inListItem");
    expect(elementsWithInListItem.length).toEqual(4);
  });

  //THEN Ean and Fullname should be according to giving props
  test("correct barcode props", () => {
    expect(mockEanDiv).toHaveTextContent(stubBarcode.ean);
    expect(mockFullNameDiv).toHaveTextContent(
      stubBarcode.firstName + " " + stubBarcode.lastName
    );
  });

  //THEN Ean and Name should be correct
  test("open and collapse button", () => {
    let innerHTMLChanges =  [];
    for(let i = 0; i < 2; i++){
      fireEvent.click(openCollapseButton);
      innerHTMLChanges.push(openCollapseButton.innerHTML)
    }
    expect(innerHTMLChanges).toEqual(['-','+'])
  });
});
