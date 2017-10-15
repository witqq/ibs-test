import * as React from "react";
import Snackbar from "material-ui/Snackbar";
import {ObservableComponent} from "../utils/mobx/ObservableComponent";
import {injectStore} from "../stores/inject-store";
import {SNACK_BAR_STORE} from "../stores/app-store";
import {SnackBarStore} from "../stores/snack-bar-store";

export class SnackBarView extends ObservableComponent {

  @injectStore(SNACK_BAR_STORE)
  snackBarStore: SnackBarStore;

  public render() {
    const snackBarStore = this.snackBarStore;
    const message = snackBarStore.message;
    return <Snackbar open={!!message}
                     autoHideDuration={4000}
                     onRequestClose={() => snackBarStore.clearMessage()}
                     SnackbarContentProps={{
                       "aria-describedby": "message-id"
                     }}
                     message={<span id="message-id">{message}</span>}/>;
  }
}