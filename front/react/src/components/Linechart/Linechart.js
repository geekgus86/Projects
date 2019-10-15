import React from 'react';
import { Line } from 'react-chartjs-2';

export default (props) => {
    return (
		<Line
			data={props.data} 
			options={props.options} 
			redraw={true}
		/>
	);
};