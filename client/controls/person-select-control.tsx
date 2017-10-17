import {SelectControl} from "./select-control";
import {Api} from "../api/api";

export class PersonSelectControl extends SelectControl {

  loadValues() {
    return Api.getPeople();
  }

}