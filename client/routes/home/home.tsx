import * as React from "react";
import {autobind} from "core-decorators";
import {Api} from "../../api/api";
import {appStore} from "../../app";
import {ObservableComponent} from "../../utils/mobx/ObservableComponent";
import {Claims} from "./claims/claims";

export class Home extends ObservableComponent {

  @autobind
  onTestClick() {
    Api.test().then(res => {
      appStore.snackBarStore.setMessage("Api working");
      console.log(res)
    });
  }

  renderContent() {
    return (
      <Claims/>

    );
  }

  render() {
    return (
      <Claims/>

    );
  }
}