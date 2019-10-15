import React from 'react';
import styles from './LabelTitulo.less';

export default (props) => {
    return (
		<div className={styles.SectionTitle + `  `+ styles.MainTitle +`  d-flex`}>{ props.titulo }</div>
	);
};