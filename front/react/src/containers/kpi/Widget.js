import React, { PureComponent } from "react";
import styles from "./KpiDashboard.less";
import "./KpiDashboard";

class Widget extends PureComponent {
  render() {
    return (
      <div className={`${styles.widgetContainer}`}>
        <div className={`${styles.widgetHeader}`}>
					<div className={`${styles.widgetTitle}`}>{this.props.title}</div>
				</div>
        <div className={`${styles.widgetBody} ${this.props.paddingClass}`}>
          {this.props.children}
        </div>
        <div className={`${styles.widgetFooter}`} style={{display: "none"}}>
          <div className={`${styles.widgetStats}`}>
            <span className={`${styles.widgetViews}`}>
              <i className={`zmdi zmdi-eye`}></i>
              126
            </span>
            <span className={`${styles.widgetComments}`}>
              <i className={`zmdi zmdi-comments`}></i>
              37
            </span>
            <span className={`${styles.widgetDocs}`}>
              <i className={`zmdi zmdi-assignment-o`}></i>
              07
            </span>
          </div>
          <div className={`${styles.widgetAuthor}`}>
            <div className={`${styles.authorNameContainer}`}>
              <div style={{fontSize: "10px"}}>Created by</div>
              <div className={`${styles.authorName}`}>Wilson Wong</div>
            </div>
            <div className={`${styles.authorImg}`}></div>
          </div>
        </div>
      </div>
    );
  }
}
export default Widget;