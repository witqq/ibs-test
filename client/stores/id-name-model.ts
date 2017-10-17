import {types} from "mobx-state-tree";

export const IdNameModel = types.model({
  id: types.string,
  name: types.string
});