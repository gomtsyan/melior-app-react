import React, { useEffect, useMemo, useState } from 'react';
import { Column } from '@ant-design/charts';
import SelectBox from "../../../components/common/SelectBox";
import { APIBaseURI, dataItemsLocationEndpoint } from "../../../constants";
import PropTypes from 'prop-types';

const getData = async () => {
    try{
        const response = await fetch(APIBaseURI+dataItemsLocationEndpoint)
        return await response.json();
    }catch (e) {
        return [];
    }
}
const LocationColumnChart = () => {
    const [selectedSuggestions, setSelectedSuggestions] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await getData();
            setData( data.sort((a, b) => (a.count < b.count) ? 1 : -1) || [])
        })()
    }, [])

    const locationSuggestionsAsOptions = useMemo(() => {
        const locationsDependsOnData = [ ...new Set( data.map(({ name }) => name) ) ]
        return locationsDependsOnData.map((suggestion, index) => ({
                label: suggestion,
                value: index,
            })
        )
    }, [data])

    const config = {
        columnStyle: {
            fill:'l(90) 0:#56CCF2 0.5:#2D9CDB 1:#2F80ED',
            cursor: 'pointer',
        },

        xField: 'name',
        yField: 'count',
        xAxis: { label: { autoRotate: false } },
        slider: {
            start: 0,
            end: 1,
        },
        style: {
            backgroundColor:'white',
            marginTop: 50,
            fontSize:12,
            fontWeight: 400,
        },
    };

    const filteredData = useMemo(() => {
        if(!selectedSuggestions || !selectedSuggestions.length){
            return data;
        }
        const labels = selectedSuggestions.map(({ label }) => label)
        return data.filter(({ name}) => labels.includes( name))
    }, [data, selectedSuggestions])

    return (
        <div>
            <Column
                {...config}
                data={filteredData}
            />
            <div>
                <div className='form-location-search' >
                    <div className="location-search-content">
                        <SelectBox
                            isMulti={true}
                            isClearable={true}
                            onChange={setSelectedSuggestions}
                            options={locationSuggestionsAsOptions}
                            value={selectedSuggestions}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
};
LocationColumnChart.propTypes = {
    filteredData : PropTypes.array,
}
export default LocationColumnChart;
