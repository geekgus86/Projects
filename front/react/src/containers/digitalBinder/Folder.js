import React, { PureComponent } from "react";
import styles from "./DigitalBinder.less";
import { FormattedMessage } from "react-intl";

class Folder extends PureComponent {
  state = {
    collapsed: true
  }

  toggleAccordion() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const displayStatus = (this.state.collapsed === true) ? "none" : "block";
    let documentCount = 0;
    this.props.folder.subfolders.forEach((s) => {
      documentCount += s.files.length;
    });
    return (
      <div className={`col-12 ${styles.accordionGroup}`}>
        <div className={`${styles.accordionHeader}`}>
          <div className={`${styles.folderLabel}`} onClick={this.toggleAccordion.bind(this)}>
            <div className={`${styles.folderNameContainer}`}>
              <div className={`${styles.folderIcon}`} style={{ backgroundColor: this.props.folder.folderColor }}></div>
                <div className={`${styles.folderName}`}>
                  {this.props.folder.folder}
                </div>
              </div>
            <div className={`${styles.folderDocumentsSize}`}>
              <FormattedMessage id="digitalBinder.Folder.docCountLbl" defaultMessage="Documentos: " />
              <span>{documentCount}</span>
            </div>
          </div>
        </div>                
        <div className={`${styles.innerCollapse} collapse`} style={{ display: displayStatus }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default Folder;