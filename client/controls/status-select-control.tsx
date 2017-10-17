import {SelectControl} from "./select-control";
import {Api} from "../api/api";

export class StatusSelectControl extends SelectControl {

  loadValues() {
    return Api.getStauses();
  }

}