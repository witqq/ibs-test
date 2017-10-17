import {ObservableComponent} from "../utils/mobx/ObservableComponent";
import {FormControl} from "material-ui/Form";
import Select from "material-ui/Select";
import Input, {InputLabel} from "material-ui/Input";
import {MenuItem} from "material-ui/Menu";
import {IdName} from "../../share/data/interfaces/id-name";
import {observable, computed, autorun} from "mobx";
import * as React from "react";
import {autobind} from "core-decorators";
import {getSnapshot} from "mobx-state-tree";

export interface SelectControlProps {
  label: string;
  value: IdName;
  onSelect?: (value: IdName) => void;
  id: string;
}

export abstract class SelectControl extends ObservableComponent<SelectControlProps> {

  @observable
  items: Array<IdName> = [];

  loaded = false;

  onWillMount() {
    autorun(() => {
      this.items = (this.props.value && [this.props.value] || []).map(val => getSnapshot(val));
      this.loaded = false;
    })
  }

  @autobind
  onClick() {
    if (this.loaded) {
      return;
    }
    this.loadValues().then(items => {
      this.loaded = true;
      this.items = items;

    });
  }

  abstract loadValues(): Promise<Array<IdName>>;

  @autobind
  onSelect(ev) {
    const id = ev.target.value;
    const item = this.items.find(item => item.id === id);
    item && this.props.onSelect && this.props.onSelect(item);
  }

  @computed
  get value() {
    return this.props.value && this.props.value.id;
  }

  render() {
    return (
      <FormControl fullWidth onClick={this.onClick}>
        <InputLabel htmlFor={this.props.id}>
          {this.props.label}
        </InputLabel>
        <Select value={this.value}
                onChange={this.onSelect}
                input={<Input id={this.props.id} fullWidth/>}
        >
          {this.items.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
        </Select>
      </FormControl>
    );
  }
}