import * as React from "react";
import AppBar from "material-ui/AppBar";
import Typography from "material-ui/Typography/Typography";
import Toolbar from "material-ui/Toolbar/Toolbar";
import {HomeButton} from "../routes/home/home-button";
import {ObservableComponent} from "../utils/mobx/ObservableComponent";

export class AppHeader extends ObservableComponent {

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit" className="tittle">
            React app
          </Typography>
          <HomeButton/>

        </Toolbar>
      </AppBar>
    );
  }
}