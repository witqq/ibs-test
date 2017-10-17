import {ObservableComponent} from "../../../utils/mobx/ObservableComponent";
import {ClaimModel} from "../../../stores/claim-model";
import Card, {CardContent, CardActions} from "material-ui/Card";
import TextField from "material-ui/TextField";
import * as React from "react";
import {ChangeEvent, FormEvent} from "react";
import {autobind} from "core-decorators";
import Button from "material-ui/Button";
import {computed} from "mobx";
import {ClaimsStore, CLAIMS_STORE} from "../../../stores/claims-store";
import {injectStore} from "../../../stores/inject-store";

export class ClaimCard extends ObservableComponent {
  @injectStore(CLAIMS_STORE)
  claimsStore: ClaimsStore;

  get view(): ClaimModel {
    return this.claimsStore.selectedClaimView;
  }

  @autobind
  onDocNumChange(ev: ChangeEvent<HTMLInputElement> & FormEvent<HTMLDivElement>) {
    const value = ev.currentTarget.value;
    this.view.setDocNum(value);
  }

  @autobind
  onNameChange(ev: ChangeEvent<HTMLInputElement> & FormEvent<HTMLDivElement>) {
    const value = ev.currentTarget.value;
    this.view.setName(value);
  }

  @computed
  get changed(): boolean {
    return this.claimsStore.selectedChanged;
  }

  @autobind
  save() {
    if (!this.changed) {
      return;
    }
    this.claimsStore.saveSelected();
  }

  render() {
    if (!this.view) {
      return (
        <div>
          Выберите заявку для редактирования
        </div>
      );
    }
    return (
      <Card>
        <CardContent>
          <TextField label="Номер"
                     value={this.view.docNum}
                     onChange={this.onDocNumChange}
                     margin="normal"/>
          <br/>
          <TextField label="Наименование"
                     value={this.view.name}
                     onChange={this.onNameChange}
                     margin="normal"/>
          <CardActions disableActionSpacing>
            <Button raised
                    disabled={!this.changed}
                    onClick={this.save}>
              Сохранить
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    );
  }
}