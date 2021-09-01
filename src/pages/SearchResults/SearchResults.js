import React, { Fragment, useState } from "react";
import SessionVolume from "./Timers/SessionVolume";
import Button from "../../components/common/Buttons/Datebtn"
import { DateCalendarFrom, DateCalendarTo } from "../../components/DataPicker/DatePicker";
import SearchVolumeDonut from "./SearchVolumeDonut";
import LineChart from "../../components/LineCharts/LineChart";
import "../../assets/pages.css"
import SearchProgress from "./SearchProgress";


const progressData = [
    {
        title: "in Top 3",
        percent:70,
        background:"rgba(86, 204, 242, 1)",
        marginBottom:15,
        marginTop:15
    },
    {
        title: "on First Page",
        percent:100,
        background:"rgba(47, 128, 237, 1)",
        marginBottom:15,
        marginTop:15
    },
    {
        title: "Successful Search",
        percent:90,
        background:"rgba(45, 156, 219, 1)",
        maxWidth:90,
        marginBottom:10,
    },
];
const averageData = [
    {
        id:'0',
        text: "session volume",
        number :143,
        margin:19
    },
    {
        id:'1',
        text: "average session time",
        number :"2:30",
        margin:19
    },
    {
        id:'2',
        text: "average search execution time",
        number :"0:20",
        margin:12,
        lineHeight:19,

    },
    {
        id:'3',
        text: "number of unique users",
        number :75,
        margin:12,
        lineHeight:19,
        maxWidth:120

    },
];
const searchData = [
    {
        year: '1988',
        value: 0,
    },
    {
        year: '1989',
        value: 1,
    },
    {
        year: '1990',
        value: 2,
    },
    {
        year: '1991',
        value: 3,
    },
    {
        year: '1992',
        value: 4,
    },
    {
        year: '1993',
        value: 3.5,
    },
    {
        year: '1994',
        value: 5,
    },
    {
        year: '1995',
        value: 4.9,
    },
    {
        year: '1996',
        value: 6,
    },
    {
        year: '1997',
        value: 7,
    },
    {
        year: '1998',
        value: 9,
    },
    {
        year: '1999',
        value: 13,
    },
];

function SearchResults() {
    const [average] = useState(averageData);
    const [progress] =useState(progressData)
    return (
        <div className="main-container">
            <div className="result-wrapper">
                <h1 className="search-title">Search Analytics</h1>
                <div className="cal-container">
                    <div className="picker-container">
                        <Fragment>
                            <DateCalendarFrom/>
                            <DateCalendarTo/>
                        </Fragment>
                    </div>
                    <div className="button-container">
                        <Button/>
                    </div>
                </div>

            </div>
            <div className='search-results'>
                {average.map(({text,number,margin,lineHeight,maxWidth, id}) => (
                    <SessionVolume
                        key={id}
                        text={text}
                        number={number}
                        margin={margin}
                        lineHeight={lineHeight}
                        maxWidth={maxWidth}
                    />
                ))}

            </div>
            <div className='search-volume-wrapper'>
                <div className="volume-container">
                    <LineChart data={searchData}/>
                    <div className="left-border"></div>
                    <SearchVolumeDonut/>
                </div>

            </div>
            <div className='accuracy-volume-wrapper'>
                <h2 className="volume-title">Where does the first click happen?</h2>
                <div className="search-progress">
                    {progress.map(({title,percent,background,maxWidth,  marginBottom, marginTop, },index) => (
                        <SearchProgress
                            key={index}
                            title={title}
                            percent={percent}
                            background={background}
                            maxWidth={maxWidth}
                            marginBottom={marginBottom}
                            marginTop={marginTop}
                        />
                    ))}
                </div>
                <div className="accuracy-container">
                    <h2 className="accuracy-subtitle">Accuracy Rank over time</h2>
                    <LineChart data={searchData}/>
                </div>

            </div>
        </div>
    );
}

export default SearchResults
