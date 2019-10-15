import React, { PureComponent } from "react";
import styles from "./DigitalBinder.less";

class Document extends PureComponent {
  render() {
    return (
      <div className={`col-3`}>
        <a href={`https://s3.us-east-2.amazonaws.com/${this.props.file.path}`} target="_blank">
          <div className={`${styles.fileContainer}`}>
            <div className={`${styles.fileIcon}`}>
              <div className={`${styles.iconContainer}`}>
                <i className={`far fa-file-pdf`}></i>
              </div>
            </div>
            <div className={`${styles.fileName}`}>
              {this.props.file.name}
            </div> 
          </div>
        </a>
      </div>
    );
  }
}
export default Document;