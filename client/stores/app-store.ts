import {SnackBarStore} from "./snack-bar-store";
import {types} from "mobx-state-tree";

export const SNACK_BAR_STORE = "snackBarStore";

export const AppStore = types.model({
  snackBarStore: types.optional(SnackBarStore, SnackBarStore.create()),
});