import React = require("react");
import {Component} from "react";
import {observer} from "mobx-react";
import {reaction, IReactionPublic, autorun} from "mobx";

@observer
export class ObservableComponent<P = {}, S = {}> extends Component<P, S> {

  protected disposers: Array<() => void> = [];

  protected reaction<T>(expression: (r: IReactionPublic) => T, effect: (arg: T, r: IReactionPublic) => void) {
    this.disposers.push(reaction(expression, effect));
  }

  protected autorun<T>(view: (r: IReactionPublic) => void) {
    this.disposers.push(autorun(view));
  }

  protected onDidMount() {

  }

  protected onWillMount() {

  }

  protected onWillUnmount() {

  }

  protected onDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>) {

  }

  componentDidMount() {
    this.onDidMount();
  }

  componentWillUnmount() {
    this.disposers.forEach(dispose => dispose && dispose());
    this.onWillUnmount();
  }

  componentWillMount() {
    this.onWillMount();
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>) {
    this.onDidUpdate(prevProps, prevState);
  }

  public render() {
    return null;
  }
}
