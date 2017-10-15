import {Claim} from "../../share/data/interfaces/claim";
import {CLAIMS_MOCK} from "./data-mock";

export function getClaims(): Array<Claim> {
  return CLAIMS_MOCK;
}

export function getClaimById(id: string): Claim {
  return CLAIMS_MOCK.find(item => item.id === id);
}