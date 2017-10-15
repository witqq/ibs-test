import * as React from "react";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import Card from "material-ui/Card";
import CardContent from "material-ui/Card/CardContent";
import CardHeader from "material-ui/Card/CardHeader";
import {autobind} from "core-decorators";
import {Api} from "../../api/api";
import {appStore} from "../../app";
import {ObservableComponent} from "../../utils/mobx/ObservableComponent";

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
      <Card>
        <CardHeader title="React fullstack ts"/>
        <CardContent>
          <Button raised
                  onClick={this.onTestClick}>
            test api
          </Button>
        </CardContent>
      </Card>
    );
  }

  render() {
    return (
      <Grid container justify="center" spacing={0}>
        <Grid item xs={11} lg={9}>
          {this.renderContent()}
        </Grid>
      </Grid>

    );
  }
}