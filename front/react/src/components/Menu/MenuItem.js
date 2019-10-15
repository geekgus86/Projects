import React from "react";
import { FaYoutube, FaFile } from "react-icons/fa";
import styles from "./Menu.less";
//import { Link } from "react-router-dom";
import ListItemIcon from '@material-ui/core/ListItemIcon';
//import homeIcon from "../../assets/Home2.png";
import ListItem from '@material-ui/core/ListItem';

function renderMenuUrl(props){
  return (
      <a href={props.url} target={props.target} className={`${styles.MenuItem}`}>
        <ListItem button onClick={props.linkClose} className={`${styles.MenuObjs}`}>
            <ListItemIcon>
                <img src={props.img} alt="home" width={28} height={28}/>
            </ListItemIcon>
            <span className={`${styles.MenuContent}`}>
              <span className={`${styles.txt}`}>{props.text}</span>
              {props.videoUrl && <a href={props.videoUrl} target="_blank"><FaYoutube /></a>}
              {props.fileUrl && <a href={props.fileUrl} target="_blank"><FaFile /></a>}
            </span>
        </ListItem>
      </a>
  )
}

const MenuItem = (props) => {
  return (
    <React.Fragment>
      { renderMenuUrl(props) }
    </React.Fragment>
  );
}

export default MenuItem;