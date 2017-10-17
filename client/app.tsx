import * as React from "react";
import {Component} from "react";
import {HashRouter} from "react-router-dom";
import {AppRoutes} from "./routes/routes";
import {Route} from "react-router";
import {Provider} from "mobx-react";
import {AppStore} from "./stores/app-store";
import Grid from "material-ui/Grid";
import {AppHeader} from "./views/app-header";
import {SnackBarView} from "./views/snack-bar-view";
import "normalize.css/normalize.css"
import {app} from "./app.less";
import {Confirm} from "./views/confirm";

export const appStore = AppStore.create();
appStore.load();

export default class App extends Component {

  renderRoutes() {
    return AppRoutes.map(routeProps => <Route {...routeProps}/>)
  }

  render() {
    return (
      <HashRouter>
        <Provider {...appStore}>
          <div className={app}>
            <Grid container align="center"
                  className="app-grid-container"
                  direction="row"
                  justify="center"
                  spacing={0}>
              <Grid item xs={12} lg={12} className="app-container">
                <AppHeader className="app-header"/>
                <div className="app-main">
                  {this.renderRoutes()}
                </div>
                <SnackBarView/>
                <Confirm/>
              </Grid>
            </Grid>
          </div>
        </Provider>
      </HashRouter>
    );
  }
}