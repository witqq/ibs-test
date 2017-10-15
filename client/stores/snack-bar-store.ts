import {types} from "mobx-state-tree";

export const SnackBarStore = types.model({
  message: types.optional(types.string, "")
}).actions(self => ({
  clearMessage() {
    self.message = "";
  },
  setMessage(message: string) {
    self.message = message;
  }
}));

export type SnackBarStore = typeof SnackBarStore.Type;


