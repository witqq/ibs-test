import {ObservableComponent} from "../utils/mobx/ObservableComponent";
import Dialog, {DialogTitle, DialogContent, DialogContentText, DialogActions} from "material-ui/Dialog";
import * as React from "react";
import Button from "material-ui/Button";
import Slide from "material-ui/transitions/Slide";
import {injectStore} from "../stores/inject-store";
import {CONFIRM_STORE} from "../stores/app-store";
import {ConfirmStore} from "../stores/confirm-store";
import {autobind} from "core-decorators";

export class Confirm extends ObservableComponent {

  @injectStore(CONFIRM_STORE)
  confirmStore: ConfirmStore;

  @autobind
  cancel() {
    this.confirmStore.onCancel();
  }

  @autobind
  ok() {
    this.confirmStore.onOk();
  }

  render() {
    const confirmStore = this.confirmStore;
    if (!confirmStore.open) {
      return null;
    }
    return ( <Dialog open={confirmStore.open}
                     transition={<Slide direction="up"/>}
                     keepMounted
                     onRequestClose={this.cancel}>
        <DialogTitle>Подтвердите действие</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmStore.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.cancel} color="default">
            Отмена
          </Button>
          <Button onClick={this.ok} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}