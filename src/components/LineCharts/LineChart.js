import React from 'react';
import { Line } from '@ant-design/charts';
import "../../assets/pages.css";
import PropTypes from 'prop-types';

const LineChart = ({data}) => {
    var config = {
        data: data,
        padding: 'auto',
        xField: 'year',
        yField: 'value',
        // stepType: 'vhv',
        slider: {
            start: 0.1,
            end: 0.5,
        },
    };

    return (
        <div className="line-container">
            <h2 className="volume-title">session volume over time</h2>
            <Line {...config} />
        </div>
    );
};

LineChart.propTypes = {
    data: PropTypes.array,
}

export default LineChart;
