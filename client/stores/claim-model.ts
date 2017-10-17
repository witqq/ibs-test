import {types} from "mobx-state-tree";
import {PersonModel} from "./person-model";
import {StatusModel} from "./status-model";
import {Person} from "../../share/data/interfaces/person";
import {ClaimStatus} from "../../share/data/interfaces/claim-status";
import v4 = require("uuid/v4");

export const ClaimModel = types.model({
    docNum: types.optional(types.string, ""),
    name: types.optional(types.string, ""),
    id: types.optional(types.string, ""),
    // идентификатор для еще не сохраненных заявок
    tempUuid: types.optional(types.string, ""),
    from: types.maybe(PersonModel),
    to: types.maybe(PersonModel),
    status: types.maybe(StatusModel)

  }
)
  .actions(self => ({
    setName(name: string) {
      self.name = name;
    },
    setDocNum(docNum: string) {
      self.docNum = docNum;
    },
    setFrom(person: Person) {
      self.from = person && PersonModel.create(person) || undefined;
    },
    setTo(person: Person) {
      self.to = person && PersonModel.create(person) || undefined;
    },
    setStatus(status: ClaimStatus) {
      self.status = status && StatusModel.create(status) || undefined;
    },
    generateUuid() {
      self.tempUuid = v4();
    }
  }))
  .views(self => ({
    get isNew(): boolean {
      return !self.id
    }
  }));

export type ClaimModel = typeof ClaimModel.Type;

export function claimChanged(claim1: ClaimModel, claim2: ClaimModel): boolean {
  if (!claim1 || !claim2) {
    return false;
  }
  if (!claim1.id && claim1.tempUuid) {
    return true;
  }
  return claim1.docNum !== claim2.docNum
    || claim1.name !== claim2.name
    || ((claim1.from && claim1.from.id) !== (claim2.from && claim2.from.id))
    || ((claim1.to && claim1.to.id) !== (claim2.to && claim2.to.id))
    || ((claim1.status && claim1.status.id) !== (claim2.status && claim2.status.id))
}