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

export const appStore = AppStore.create();

export default class App extends Component {

  renderRoutes() {
    return AppRoutes.map(routeProps => <Route {...routeProps}/>)
  }

  render() {
    return (
      <HashRouter>
        <Provider {...appStore}>
          <div>
            <Grid container justify="center" className="app-container" >
              <Grid className={"header"} item xs={12} lg={9} style={{paddingLeft: -8, paddingRight: -8}}>
                <AppHeader/>
              </Grid>
              <Grid item xs={12} lg={9}>
                {this.renderRoutes()}
                <SnackBarView/>
              </Grid>
            </Grid>
          </div>
        </Provider>
      </HashRouter>
    );
  }
}