import React from 'react';
import Button from '@material-ui/core/Button';
import styles from '../../styles/buttons.less'

export default (props) => {

    const getType = () => {
        switch(props.type) {
            case 'outlinedWhite':
                return styles.outlinedWhite;
            case 'outlinedBlue':
                return styles.outlinedBlue;
            default:
                return styles.normalButton;
        }
    }

    return (
        <Button type={props.type} className={`${getType()} ${props.className}`} style={props.style} onClick={props.onClickButton}>
            {props.title}
        </Button> 
	);
};