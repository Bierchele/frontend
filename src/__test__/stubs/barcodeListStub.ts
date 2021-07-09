interface Barcode {
  _id: Partial<string>;
  ean: string;
  firstName: string;
  lastName: string;
}

export const barcodeListStub = (): Array<Barcode> => {
  return [
    { _id: "5", ean: "25478", firstName: "Wizzy", lastName: "Buttkinn" },
    { _id: "5", ean: "25478", firstName: "Wizzy", lastName: "Buttkinn" },
    { _id: "5", ean: "25478", firstName: "Wizzy", lastName: "Buttkinn" },
    { _id: "5", ean: "25478", firstName: "Wizzy", lastName: "Buttkinn" },
  ];
};
