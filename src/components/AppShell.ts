import LogicalComponent from "../classes/LogicalComponent";
import { query } from "lit-element";

class AppShell extends LogicalComponent {
  static tagName = "app-shell";

  @query("#shell-sidebar")
  sidebar: any;

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this._registerEvents();
  }

  private _registerEvents() {
    this.sidebar.onclick = this._openSidebar;
  }

  // events
  private _openSidebar = () => {
    this.sidebar.classList.toggle("app-shell__sidebar--closed");
  };
}

export default AppShell;
