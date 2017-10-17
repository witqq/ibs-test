import {SnackBarStore} from "./snack-bar-store";
import {types} from "mobx-state-tree";
import {ClaimsStore} from "./claims-store";

export const SNACK_BAR_STORE = "snackBarStore";

export const AppStore = types.model({
    snackBarStore: types.optional(SnackBarStore, SnackBarStore.create()),
    claimsStore: types.optional(ClaimsStore, ClaimsStore.create())
  }).actions(self => ({
    load: () => self.claimsStore.load()
  }))
;