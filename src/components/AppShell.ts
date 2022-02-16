import LogicalComponent from "../classes/LogicalComponent";
import { query } from "lit-element";
import { animate } from "popmotion";

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
    const sidebar = this.sidebar as HTMLElement
    animate({
      to: 180,
      type: "spring",
      duration: 200,
      onUpdate: (value) => sidebar.style.width = `calc(270px - ${value}px)`,
    });

    /* this.sidebar.classList.toggle("app-shell__sidebar--closed"); */
  };
}

export default AppShell;
