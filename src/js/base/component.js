import { LitElement } from "lit-element";

export default class Component extends LitElement {
  static get tagName() {
    return "";
  }

  createRenderRoot() {
    return this;
  }
}
