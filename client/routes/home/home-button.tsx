import * as React from "react";
import {withRouter} from "react-router";
import {WithRouterProps} from "../../utils/router/with-router-props";
import Button from "material-ui/Button";
import {autobind} from "core-decorators";
import {ObservableComponent} from "../../utils/mobx/ObservableComponent";

@withRouter
export class HomeButton extends ObservableComponent<WithRouterProps> {

  @autobind
  goHome() {
    this.props.history.push("/");
  }

  render() {
    return (
      <Button onClick={this.goHome}>
        Home
      </Button>
    );
  }

}
