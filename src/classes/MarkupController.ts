import { LitElement } from "lit-element";

/**
 * Custom element without markup, made only to
 * control static html markup
 *  */
export default class MarkupController extends LitElement {
  createRenderRoot() {
    return this;
  }
}
