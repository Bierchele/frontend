import { Length } from "class-validator";

export class BarcodeRequirements {
  @Length(1, 10)
  ean: string | undefined = "";
  @Length(1, 20)
  firstName: string | undefined = "";
  @Length(1, 20)
  lastName: string | undefined = "";
}
