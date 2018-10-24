import React, { Component } from "react";

class DropDownMenu extends Component {
  render() {
    return <div className="dropdownmenu">{this.props.children}</div>;
  }
}

export default DropDownMenu;
