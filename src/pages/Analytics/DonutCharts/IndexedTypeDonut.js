import React, { useCallback, useMemo } from 'react';
import { IgrDoughnutChartModule } from 'igniteui-react-charts';
import { IgrDoughnutChart } from 'igniteui-react-charts';
import { IgrRingSeriesModule } from 'igniteui-react-charts';
import { IgrRingSeries } from 'igniteui-react-charts';
import "../../../assets/donut.css";
// import Humanize from "humanize-plus";
import PropTypes from 'prop-types';

IgrDoughnutChartModule.register();
IgrRingSeriesModule.register();

const IndexedTypeDonut = ({ setSecondSelectedSlice, secondSelectedSlice,items}) => {
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
        return resultList
    }, [])
    const total = useMemo(() => calcPercentageOfItems(items, 'indexable'), [items]);
    const onSliceClick = useCallback( (s, e) => {
        const newSelectedSlice = e.i.dataContext.name;
        setSecondSelectedSlice(newSelectedSlice)
    }, [secondSelectedSlice, setSecondSelectedSlice]);
    // let totalValue=indexedTypeData ? Humanize.compactInteger(indexedTypeData.indexable, 1):'';
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
                    valueMemberPath="value"
                    labelInnerColor="white"
                    radiusFactor={0.9}
                    brushes={['#2F80ED']}
                    startAngle={180}/>
            </IgrDoughnutChart>
            <div className="ig-content">
                <span>from</span>
                <h3>{}</h3>
                <span>Indexed Items</span>
            </div>
        </div>
    );
}
IndexedTypeDonut.propTypes = {
    items: PropTypes.array,
    setSecondSelectedSlice:PropTypes.func,
    secondSelectedSlice:PropTypes.oneOfType ([
        PropTypes.object,
        PropTypes.string,
    ]),
}
export default IndexedTypeDonut;
