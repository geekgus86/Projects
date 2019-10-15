import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./DigitalBinder.less";
import { documentsFolderStruct } from "./data";
import { guid } from "../../lib/utils";
import { FormattedMessage } from "react-intl";
import Folder from "./Folder";
import SubFolder from "./SubFolder";
import Document from "./Document";

class DigitalBinder extends PureComponent {
  renderFolders() {
    let fragment = null;
    fragment = documentsFolderStruct.map((docs) => {
      return (
        <Folder key={guid()} folder={docs}>
          {docs.subfolders.map((subfolder) => {
            return <SubFolder key={guid()} subfolder={subfolder}>
              {subfolder.files.map((file) => {
                 return <Document file={file} key={guid()} />
              })}
            </SubFolder>
          })}
        </Folder>
      );
    });
    return fragment;
  }

  render() {
    return (
      <div className={`col-12`}>
        <div className={`${styles.header} col-12`}>
            <h4 className={`${styles.uppercase} ${styles.bold}`}>
              <FormattedMessage id="digitalBinder.DigitalBinder.title" defaultMessage="Administración de documentos" />
            </h4>
        </div>
        <div className={`${styles.digitalBinder}`}>
          {this.renderFolders()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DigitalBinder);