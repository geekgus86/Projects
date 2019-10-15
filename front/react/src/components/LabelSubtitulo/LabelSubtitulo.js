import React from 'react';
import styles from './LabelSubtitulo.less';

export default (props) => {
    return (
        <div className={styles.SectionSubtitle + `  `+ styles.SubTitle +`  d-flex`}>
            <span>{ props.subtitle }</span>
            { props.children }
        </div>
	);
};