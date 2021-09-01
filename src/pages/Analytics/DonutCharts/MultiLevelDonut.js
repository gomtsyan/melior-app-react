import React, {useEffect, useMemo, useRef} from 'react';
import Sunburst from 'sunburst-chart';
import PropTypes from 'prop-types';

const allowedTypes = ["Text", "Media", "Other"];
const MyChart = ({items, setSelectedSlice}) => {
    const ref = useRef(null);
    const itemsLength = items && items.length;
    const sum = useMemo(() => items ? items.reduce((acc, cur) => acc + cur.count, 0) : 0,
        [itemsLength]
    )
    useEffect(() => {
        if (!ref || !ref.current) {
            return
        }
        let updatedData = {
            name: "",
            color: "#FFFFFF00",
            children: [{
                name: "Text",
                color: "#D93434",
                count: 0,
                children: []
            }, {
                name: "Media",
                color: "#5ee35e",
                count: 0,
                children: []
            }, {
                name: "Other",
                color: "#4f4fde",
                count: 0,
                children: []
            }]
        }
        const myChart = Sunburst();
        if (!items) {
            return;
        }
        for (let item of items) {
            if (item.type === 'text') {
                updatedData['children'][0]['count'] += item.count;
                updatedData['children'][0]['children'].push({
                    name: item.extension,
                    color: "#d94c4c",
                    count: item.count,
                    children: [{
                        name: "indexable",
                        color: "#d97070",
                        value: item.indexable,
                    }, {
                        name: "",
                        color: "#FFFFFF00",
                        value: item["non-indexable"]
                    }]
                })
            } else if (item.type === 'media') {
                updatedData['children'][1]['count'] += item.count;
                updatedData['children'][1]['children'].push({
                    name: item.extension,
                    color: "#83e583",
                    count: item.count,
                    children: [{
                        name: "indexable",
                        color: "#a6e8a6",
                        value: item.indexable
                    }, {
                        name: "",
                        color: "#FFFFFF00",
                        value: item["non-indexable"]
                    }]
                })
            } else if (item.type === 'other') {
                updatedData['children'][2]['count'] += item.count;
                updatedData['children'][2]['children'].push({
                    name: item.extension,
                    color: "#6e6ee0",
                    count: item.count,
                    children: [{
                        name: "indexable",
                        color: "#9898e7",
                        value: item.indexable
                    }, {
                        name: "",
                        color: "#FFFFFF00",
                        value: item["non-indexable"]
                    }]
                })
            }
        }
        myChart.data(updatedData)(ref.current);
        myChart.onClick((object) => {
            if (object) {
                if (allowedTypes.includes(object.name)) {
                    setSelectedSlice(object.name);
                }
                myChart.focusOnNode(object)
            }
        });
        // myChart.labelOrientation("angular");
        myChart.excludeRoot(true);
        myChart.centerRadius(0.35);
        myChart.width(450).height(500);
        myChart.radiusScaleExponent(1);
        myChart.strokeColor("#ffffff00");
        myChart.showTooltip((object) => {
            return !!object.name;
        })
        myChart.tooltipTitle((object) => {
            return object.name
        });
        myChart.tooltipContent((object) => {
            const count = object.count ? object.count : object.value;
            const percentage = count / sum * 100;
            const roundedPercentage = percentage.toFixed(2);
            return `${roundedPercentage}%`
            // return object.value ? object.value : object.count
        });
        myChart.color((object) => {
            return object.color ? object.color : "#000"
        })
    }, [ref, items])

    return <div ref={ref}></div>;
}
MyChart.propTypes = {
    items: PropTypes.array,
    etSelectedSlice:PropTypes.func,
}

export default MyChart
