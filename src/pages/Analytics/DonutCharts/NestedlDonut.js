import React, { useCallback, useMemo, useState } from 'react';
import "../../../assets/donut.css";
import Humanize from "humanize-plus";
import MyChart from "./MultiLevelDonut";


const DoughnutChartRings = ({ setSelectedSlice, items }) =>  {
    const [maxCountValue, setMaxCountValue] = useState(0)
    const calcPercentageOfItems = useCallback((items, key) => {
        if(!items){
            return []
        }
        const groupedItems = {}
        items.forEach( (item) => {
            const { type } = item;
            let groupedItem = groupedItems[type] || 0;
            groupedItem += item[key];
            groupedItems[type] = groupedItem
        })
        let maxCountValue = 0
        Object.keys(groupedItems).forEach( key => maxCountValue += groupedItems[key])
        const resultList = [];
        Object.keys(groupedItems).forEach( key => {
            const percent = (groupedItems[key] / maxCountValue * 100).toFixed(2);
            resultList.push({
                value: +percent,
                label: `${percent}%`,
                name: key,
            })
        })
        if(key === 'count'){
            setMaxCountValue(maxCountValue)
        }
        return resultList
    }, [setMaxCountValue])
    const total = useMemo(() => calcPercentageOfItems(items, 'indexable'), [items]);
    const indexable = useMemo( () => calcPercentageOfItems(items, 'count'), [items]);
    let totalValue=Humanize.compactInteger(maxCountValue, 1)
    return (
        <div className="charts-container">
            <MyChart setSelectedSlice={setSelectedSlice} items={items} total={total} indexable={indexable} />
            <div className="ig-content">
                <span>from</span>
                <h3>{totalValue}</h3>
                <span>Indexed Items</span>
            </div>
        </div>
    );
}

export default DoughnutChartRings;
