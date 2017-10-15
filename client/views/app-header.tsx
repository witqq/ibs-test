import * as React from "react";
import AppBar from "material-ui/AppBar";
import Typography from "material-ui/Typography/Typography";
import Toolbar from "material-ui/Toolbar/Toolbar";
import {ObservableComponent} from "../utils/mobx/ObservableComponent";

export interface AppHeaderProps {
  className?: string
}

export class AppHeader extends ObservableComponent<AppHeaderProps> {

  render() {
    return (
      <AppBar position="static" className={this.props.className}>
        <Toolbar>
          <Typography type="title" color="inherit" className="tittle">
            React app
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}