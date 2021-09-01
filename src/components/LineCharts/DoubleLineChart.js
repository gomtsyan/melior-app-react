import React from 'react';
import { Line } from '@ant-design/charts';
import PropTypes from 'prop-types';

const DemoLine = ({data, yField}) => {

    var config = {
        data: data,
        padding: 'auto',
        xField: 'date',
        yField: yField,
        // seriesField: 'key',
        slider: {
            start: 0,
            end: 1,
        },
    };

    return <Line {...config} /> ;
};

DemoLine.propTypes = {
    data: PropTypes.array,
}
export default DemoLine;
