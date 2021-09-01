import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { IgrDoughnutChartModule } from 'igniteui-react-charts';
import { IgrDoughnutChart } from 'igniteui-react-charts';
import { IgrRingSeriesModule } from 'igniteui-react-charts';
import { IgrRingSeries } from 'igniteui-react-charts';
import "../../../assets/donut.css";
import Humanize from "humanize-plus";

IgrDoughnutChartModule.register();
IgrRingSeriesModule.register();

const LanguageTypeDonut =({ setThirdSelectedSlice, thirdSelectedSlice, items }) => {
    const [maxCountValue, setMaxCountValue] = useState(0)
    const calcPercentageOfItems = useCallback((items, key) => {
        if(!items){
            return []
        }
        const groupedItems = {}
        items.forEach( (item) => {
            const { lang } = item;
            let groupedItem = groupedItems[lang] || 0;
            groupedItem += item[key];
            groupedItems[lang] = groupedItem
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
    const total = useMemo(() => calcPercentageOfItems(items, 'count'), [items]);
    let totalValue=Humanize.compactInteger(maxCountValue, 1)
    const onSliceClick = useCallback( (s, e) => {
        const newSelectedSlice = e.i.dataContext.name;
        setThirdSelectedSlice(newSelectedSlice)
    }, [thirdSelectedSlice, setThirdSelectedSlice]);
    return (
        <div className="igContainer">
            <IgrDoughnutChart
                height="500"
                width="100%"
                selectedSliceOpacity={0}
                allowSliceExplosion="true"
                allowSliceSelection='true'
                sliceClick={onSliceClick}>
                <IgrRingSeries
                    name="total"
                    dataSource={total}
                    labelsPosition="Center"
                    labelMemberPath="label"
                    labelInnerColor="white"
                    valueMemberPath="value"
                    radiusFactor={0.9}
                    brushes={['#2D9CDB']}
                    startAngle={180}/>
            </IgrDoughnutChart>
            <div className="ig-content">
                <span>from</span>
                <h3>{totalValue}</h3>
                <span>Indexed Items</span>
            </div>
        </div>
    );
}
LanguageTypeDonut.propTypes = {
    items: PropTypes.array,
    setThirdSelectedSlice:PropTypes.func,
    thirdSelectedSlice:PropTypes.oneOfType ([
        PropTypes.object,
        PropTypes.string,
    ]),
}
export default LanguageTypeDonut
