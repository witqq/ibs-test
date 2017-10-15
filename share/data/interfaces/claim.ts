import {IdName} from "./id-name";
import {Person} from "./person";
import {ClaimStatus} from "./claim-status";

export interface Claim extends IdName {
  docNum: string;
  from: Person;
  to: Person;
  status: ClaimStatus;
}