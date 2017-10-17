import {ObservableComponent} from "../../../utils/mobx/ObservableComponent";
import {ClaimModel} from "../../../stores/claim-model";
import {CardContent, CardActions} from "material-ui/Card";
import TextField from "material-ui/TextField";
import * as React from "react";
import {ChangeEvent, FormEvent} from "react";
import {autobind} from "core-decorators";
import Button from "material-ui/Button";
import {computed} from "mobx";
import {ClaimsStore, CLAIMS_STORE} from "../../../stores/claims-store";
import {injectStore} from "../../../stores/inject-store";
import {PersonSelectControl} from "../../../controls/person-select-control";
import {StatusSelectControl} from "../../../controls/status-select-control";
import {ClaimStatus} from "../../../../share/data/interfaces/claim-status";
import {Person} from "../../../../share/data/interfaces/person";
import Typography from "material-ui/Typography";

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

  @autobind
  onStatusSelect(value: ClaimStatus) {
    this.view.setStatus(value);
  }

  @autobind
  onFromSelect(value: Person) {
    this.view.setFrom(value);
  }

  @autobind
  onToSelect(value: Person) {
    this.view.setTo(value);
  }

  render() {
    if (!this.view) {
      return (
        <Typography>
          Выберите заявку для редактирования
        </Typography>
      );
    }
    return (
      <div>
        <CardContent>
          <TextField label="Номер"
                     value={this.view.docNum}
                     onChange={this.onDocNumChange}
                     margin="normal"
                     fullWidth/>
          <br/>
          <TextField label="Наименование"
                     value={this.view.name}
                     onChange={this.onNameChange}
                     margin="normal"
                     fullWidth/>
          <br/>
          <PersonSelectControl value={this.view.from}
                               label="От кого"
                               id="from"
                               onSelect={this.onFromSelect}/>
          <PersonSelectControl value={this.view.to}
                               label="Кому"
                               id="to"
                               onSelect={this.onToSelect}/>
          <StatusSelectControl value={this.view.status}
                               label="Статус"
                               id="status"
                               onSelect={this.onStatusSelect}/>

        </CardContent>
        <CardActions disableActionSpacing>
          <Button raised
                  disabled={!this.changed}
                  onClick={this.save}>
            Сохранить
          </Button>
        </CardActions>
      </div>
    );
  }
}