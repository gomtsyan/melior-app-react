import React, { useMemo } from 'react';
import {IgrDoughnutChartModule} from 'igniteui-react-charts';
import {IgrDoughnutChart} from 'igniteui-react-charts';
import {IgrRingSeriesModule} from 'igniteui-react-charts';
import {IgrRingSeries} from 'igniteui-react-charts';
import "../../assets/donut.css";
import PropTypes from 'prop-types';


IgrDoughnutChartModule.register();
IgrRingSeriesModule.register();

const SearchVolumeDonut = () => {
    const total = useMemo(() => [
        { value: 5000, label: "100%", name: "text" },
    ], []);

    return (
        <div className="igContainer">
            <h2 className="volume-title">Volume of search by languages</h2>
            <IgrDoughnutChart
                height="500"
                width="100%"
                selectedSliceOpacity={0}
                allowSliceExplosion="true"
                allowSliceSelection='true'>
                <IgrRingSeries
                    name="total"
                    dataSource={total}
                    labelsPosition="Center"
                    labelMemberPath="label"
                    valueMemberPath="value"
                    labelInnerColor="white"
                    radiusFactor={0.9}
                    brushes={['#2D9CDB']}
                    startAngle={180}/>
            </IgrDoughnutChart>
        </div>
    );
}
SearchVolumeDonut.prototype ={
    total: PropTypes.array,
}
export default SearchVolumeDonut;
