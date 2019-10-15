import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export default (props) => {
    return (
			<Doughnut
				data={props.data} 
				options={props.options} 
				width={props.width}
				height={props.height}
			/>
		);
};