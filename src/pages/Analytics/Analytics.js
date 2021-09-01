import React, {useEffect, useState} from 'react';
import ProgBar from "./ProgressBars/IndexingAnalyticsProgressBar";
import LocationColumnChart from "./ColumnCharts/LocationColumnChart";
import DataTable from "./DataTables/ItemsTypeDataTable";
import IndexedFilesTable from "./DataTables/IndexedFilesTable";
import IndexedTypeDonut from "./DonutCharts/IndexedTypeDonut";
import IndexedLocationColumnChart from "./ColumnCharts/IndexedLocationColumnChart";
import DoughnutChartRings from './DonutCharts/NestedlDonut';
import LanguageTypeDonut from "./DonutCharts/LanguageTypeDonut"
import LanguageTypeDataTable from "./DataTables/LanguageTypeDataTable";
import { APIBaseURI, dataItemsTypeEndpoint, indexItemsTypeCoverageEndpoint, indexItemsLanguageEndpoint } from "../../constants";

const getItemsTypeData = (setLoading,setError) => new Promise(resolve => {
    setLoading(true)
    fetch(APIBaseURI+dataItemsTypeEndpoint)
        .then(res => res.json())
        .then(
            (result) => {
                resolve(result)
            },
        )
        .catch( (error) => {
            setError(true)
            console.log(error)
        })
        .finally(()=>setLoading(false))
})
const getIndexedCoverageData = () => new Promise(resolve => {
    fetch(APIBaseURI+indexItemsTypeCoverageEndpoint)
        .then(res => res.json())
        .then(
            (result) => {
                resolve(result)
            },
            (error) => {
                console.log(error)
            }
        )
})
const getLanguageCoverageData = (setLanguageLoading,setError) => new Promise(resolve => {
    setLanguageLoading(true)
    fetch(APIBaseURI+indexItemsLanguageEndpoint)
        .then(res => res.json())
        .then(
            (result) => {
                resolve(result)
            },
        )
        .catch( (error) => {
            setError(true)
            console.log(error)
        })
        .finally(()=>setLanguageLoading(false))
})

function Analytics() {
    //set datas
    const [selectedSlice, setSelectedSlice] = useState(null)
    const [secondSelectedSlice, setSecondSelectedSlice] = useState(null)
    const [thirdSelectedSlice, setThirdSelectedSlice] = useState(null)
    const [itemsTypeData, setItemsTypeData] = useState(null)
    const [coverageTypeData, setCoverageTypeData] = useState(null)
    const [languageTypeData, setLanguageTypeData] = useState(null)

    //loading and error
    const [loading, setLoading]=useState(false)
    const [error, setError]=useState(false)  
    const [languageLoading, setLanguageLoading]=useState(false)
    const [languageError, setLanguageError]=useState(false)

    useEffect(() => {
        (async () => {
            const data = await getItemsTypeData (setLoading,setError);
            const coverageData=await getIndexedCoverageData ();
            const languageData=await getLanguageCoverageData (setLanguageLoading,setLanguageError);
            setItemsTypeData(data)
            setCoverageTypeData(coverageData)
            setLanguageTypeData(languageData)
        })()
    }, [])
    return (
        <div className="main-container">
            <div className='analytics'>
                <h3 className='main-title'>Indexing Analytics</h3>
                <ProgBar/>
                <div className="data-content">
                    <h2 className='donut-title'>What are the types of your files?</h2>
                    <div className='donut-cont'>
                        <DoughnutChartRings
                            setSelectedSlice={setSelectedSlice}
                            selectedSlice={selectedSlice}
                            items={itemsTypeData}
                        />
                        <DataTable selectedSlice={selectedSlice} items={itemsTypeData}/>
                    </div>
                    <h2 className='demo-title'>Where are your files located? </h2>
                    <LocationColumnChart/>
                </div>
                <div className="second-data-content">
                    <h2 className='donut-title'>What are the types of your indexed files?</h2>
                    <div className="donut-wrapper">
                        <IndexedTypeDonut setSecondSelectedSlice={setSecondSelectedSlice}
                                          secondSelectedSlice={secondSelectedSlice} items={coverageTypeData}/>
                        <IndexedFilesTable secondSelectedSlice={secondSelectedSlice} items={coverageTypeData} loading={loading} error={error}/>
                    </div>
                    <div className='second-demo-container'>
                        <h2 className='demo-title'>Where are your Indexed Items Located?</h2>
                        <IndexedLocationColumnChart/>
                    </div>
                    <div className='donut-container'>
                        <h2 className='donut-title'>What are the languages of your indexed items?</h2>
                        <div className="donut-wrapper">
                            <LanguageTypeDonut setThirdSelectedSlice={setThirdSelectedSlice}
                                               thirdSelectedSlice={thirdSelectedSlice} items={languageTypeData}/>
                            <LanguageTypeDataTable thirdSelectedSlice={thirdSelectedSlice} items={languageTypeData} loading={languageLoading} error={languageError} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analytics
