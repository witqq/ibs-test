import {types} from "mobx-state-tree";

export const ConfirmStore = types.model({
  message: types.optional(types.string, ""),
  open: types.maybe(types.boolean)

}).actions(self => {
  let resolve: (result: boolean) => void;

  return {
    ask(message: string): Promise<boolean> {
      self.message = message;
      self.open = true;
      return new Promise<boolean>(res => {
        resolve = res;
      })
    },
    onOk() {
      resolve(true);
      resolve = undefined;
      self.message = undefined;
      self.open = false;
    },
    onCancel() {
      resolve(false);
      resolve = undefined;
      self.message = undefined;
      self.open = false;
    }
  }
});

export type ConfirmStore = typeof ConfirmStore.Type;


