import React, { PureComponent } from "react";
import styles from "./DigitalBinder.less";

class SubFolder extends PureComponent {
  state = {
    collapsed: true
  }

  toggleAccordion() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const displayStatus = (this.state.collapsed === true) ? "none" : "block";
    return (
      <div className={`${styles.accordionGroupInner}`}>
        <div className={`${styles.accordionHeader}`}>
          <div className={`${styles.folderLabelInner}`} onClick={this.toggleAccordion.bind(this)}>
            <i className={`fas fa-caret-down ${styles.Icon}`}></i>
            <div className={`${styles.folderName}`}>                                    
              {this.props.subfolder.folder}
            </div>
          </div>
        </div>
        <div className={`${styles.filesCollapse} collapse`} style={{ display: displayStatus }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default SubFolder;