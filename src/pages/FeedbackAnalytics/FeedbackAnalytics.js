import React, { Fragment, useState, useEffect } from "react";
import { IndividualProgressBar } from "../../components/ProgressBar/ProgressBar";
import Stars from "./Stars";
import Button from "../../components/common/Buttons/Datebtn";
import {
  DateCalendarFrom,
  DateCalendarTo,
} from "../../components/DataPicker/DatePicker";
import DoubleLineChart from "../../components/LineCharts/DoubleLineChart";
import {
  APIBaseURI,
  feedbackTotalEndpoint,
  feedbackAverageEndpoint,
  feedbackProgressEndpoint,
  feedbackRatingEndpoint,
  feedbackVolumeOverTimeEndpoint,
  feedbackRatioOverTimeEndpoint,
  feedbackTotalSearchEndpoint,
  feedbackProgressSearchEndpoint,
  feedbackSearchAverageEndpoint,
} from "../../constants";
import moment from "moment";
//import { usePrevious } from "../../hooks/usePrevious";

const getTotalData = (search) =>
  new Promise((resolve) => {
    fetch(APIBaseURI + feedbackTotalEndpoint + search)
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

const getTotalSearchData = (search) =>
  new Promise((resolve) => {
    fetch(APIBaseURI + feedbackTotalSearchEndpoint + search)
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

const getAveragelData = (search) =>
  new Promise((resolve) => {
    fetch(APIBaseURI + feedbackAverageEndpoint + search)
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });
const getSearchAveragelData = (search) =>
  new Promise((resolve) => {
    fetch(APIBaseURI + feedbackSearchAverageEndpoint + search)
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

const getProgressData = (search) =>
  new Promise((resolve) => {
    fetch(APIBaseURI + feedbackProgressEndpoint + search)
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });
const getProgressSearchData = (search) =>
  new Promise((resolve) => {
    fetch(APIBaseURI + feedbackProgressSearchEndpoint + search)
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

/*const getRatingData = (search) =>
  new Promise((resolve) => {
    fetch(APIBaseURI + feedbackRatingEndpoint + search)
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });*/

const getRatingVoulumeData = (search) =>
  new Promise((resolve) => {
    fetch(APIBaseURI + feedbackVolumeOverTimeEndpoint + search)
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

const getRatingRatioData = (search) =>
  new Promise((resolve) => {
    fetch(APIBaseURI + feedbackRatioOverTimeEndpoint + search)
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

function FeedBack() {
  const [selectedDate, setSelectedDate] = useState({
    start_date: null,
    end_date: null,
  });
  // filtered states
  const [filter, setFilter] = useState(null);
  const [filterDelta, setFilterDelta] = useState(1);
  // not filtered case states
  const [selectedDateDelta, setSelectedDateDelta] = useState(null);
  const [totalData, setTotalData] = useState(null);
  const [totalSearchData, setTotalSearchData] = useState(null);
  const [averageData, setAverageData] = useState(null);
  const [averageSearchData, setAverageSearchData] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [progressSearchData, setProgressSearchData] = useState(null);
  //const [feedbackRatingData, setFeedbackRatingData] = useState(null);
  const [feedbackVolumeData, setFeedbackVolumeData] = useState(null);
  const [feedbackRatioData, setFeedbackRatioData] = useState(null);

  useEffect(() => {
    for (var attribute in selectedDate) {
      if (
          selectedDate[attribute] === null ||
          selectedDate[attribute] === undefined
      ) {
        delete selectedDate[attribute];
      }
    }

    (async () => {
      const search =
          selectedDate.start_date || selectedDate.end_date
              ? `?${new URLSearchParams(selectedDate).toString()}`
              : "";

      const dataTotal = await getTotalData(search);
      const dataTotalSearch = await getTotalSearchData(search);
      const dataAverage = await getAveragelData(search);
      const dataSearchAverage = await getSearchAveragelData(search);
      const dataProgress = await getProgressData(search);
      const dataSearchProgress = await getProgressSearchData(search);
      //const dataRating = await getRatingData(search);
      const dataRatingVolume = await getRatingVoulumeData(search);
      const dataRatio = await getRatingRatioData(search);
      dataRatingVolume.sort(function (a, b) {
        var keyA = new Date(a.date),
            keyB = new Date(b.date);
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
      dataRatio.sort(function (a, b) {
        var keyA = new Date(a.date),
            keyB = new Date(b.date);
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
      setTotalData(dataTotal);
      setTotalSearchData(dataTotalSearch);
      setAverageSearchData(dataSearchAverage);
      setAverageData(dataAverage);
      setProgressData(Object.values(dataProgress));
      setProgressSearchData(Object.values(dataSearchProgress));
      //setFeedbackRatingData(dataRating);
      setFeedbackVolumeData(dataRatingVolume);
      setFeedbackRatioData(dataRatio);
    })();
  }, [selectedDate.start_date, selectedDate.end_date]);

  useEffect(() => {
    let start_date, end_date;
    if (!filter) {
      return;
    }

    switch (filter) {
      case 1:
        start_date = moment()
          .subtract(filterDelta, "weeks")
          .startOf("isoWeek")
          .format("YYYY-MM-DD");
        end_date = moment()
          .subtract(filterDelta, "weeks")
          .endOf("isoWeek")
          .format("YYYY-MM-DD");
        setSelectedDate({ start_date, end_date });
        break;
      case 2:
        start_date = moment()
          .subtract(filterDelta, "months")
          .startOf("month")
          .format("YYYY-MM-DD");
        end_date = moment()
          .subtract(filterDelta, "months")
          .endOf("month")
          .format("YYYY-MM-DD");
        setSelectedDate({ start_date, end_date });
        break;
      case 3:
        start_date = moment()
          .subtract(filterDelta, "years")
          .startOf("year")
          .format("YYYY-MM-DD");
        end_date = moment()
          .subtract(filterDelta, "years")
          .endOf("year")
          .format("YYYY-MM-DD");
        setSelectedDate({ start_date, end_date });
        break;
      case 4:
        start_date = moment()
          .subtract(filterDelta, "days")
          .startOf("day")
          .format("YYYY-MM-DD");
        end_date = moment()
          .subtract(filterDelta, "days")
          .endOf("day")
          .format("YYYY-MM-DD");
        setSelectedDate({ start_date, end_date });
        break;
      default:
    }
  }, [filter, filterDelta]);

  const calculcateDiff = ({ start, end }) => {
    if (start && end && !filter) {
      const diff = moment(end).diff(moment(start), "days");
       setSelectedDateDelta(diff);
    }
  };

  useEffect(() => {
    setFilterDelta(1);
    setSelectedDateDelta(null);
  }, [filter]);

  const setDate = (direction) => {
    if (filter) {
      return;
    }
    const action = selectedDateDelta * direction;

    const start_date = moment(selectedDate.start_date)
      .subtract(action, "days")
      .startOf("day")
      .format("YYYY-MM-DD");
    const end_date = moment(selectedDate.end_date)
      .subtract(action, "days")
      .endOf("day")
      .format("YYYY-MM-DD");

    if (moment(end_date) > moment()) {
    } else {
      setSelectedDate({ start_date, end_date });
    }
  };

  const setEndDate = (end_date) => {
    setSelectedDate({ ...selectedDate, end_date });
    calculcateDiff({ start: selectedDate.start_date, end: end_date });
    setFilter(null);
    setFilterDelta(1);
 
  };
  const setStartDate = (start_date) => {
    setSelectedDate({ ...selectedDate, start_date });
    calculcateDiff({ start: start_date, end: selectedDate.end_date });
    setFilter(null);
    setFilterDelta(1);

  };


  return (
    <div className="main-container">
      <div className="result-wrapper">
        <h1 className="feedback-title">User Feedback Analytics</h1>
        {filter ? (
          <Fragment>
            <button onClick={() => setFilterDelta(filterDelta + 1)}>
              prev
            </button>
            <button
              onClick={() =>
                setFilterDelta(filterDelta - 1 ? filterDelta - 1 : 1)
              }
            >
              next
            </button>
          </Fragment>
        ) : null}
        {selectedDateDelta ? (
          <Fragment>
            <button onClick={() => setDate(1)}>prev date</button>
            <button onClick={() => setDate(-1)}>next date</button>
          </Fragment>
        ) : null}
        <div className="cal-container">
          <div className="picker-container">
            <Fragment>
              <DateCalendarFrom
                onChange={setStartDate}
                value={selectedDate.start_date}
                endValue={selectedDate.end_date}
              />
              <DateCalendarTo
                onChange={setEndDate}
                startValue={selectedDate.start_date}
                value={selectedDate.end_date}
              />
            </Fragment>
          </div>
          <div className="button-container">
            <Button value={filter} onChange={setFilter} />
          </div>
        </div>
      </div>
      <div className="feedback">
        <div className="individual-content">
          {averageSearchData && (
            <Stars
              totalData={totalData}
              averageData={averageData}
              activeColor="#56CCF2"
              start_date={selectedDate.start_date}
              end_date={selectedDate.end_date}
            />
          )}
          {progressData
            ? progressData.map((value, index) => {
                const star = 5 - index;
                const originalIndex = 4 - index;
                const progress = progressData[originalIndex];
                return (
                  <IndividualProgressBar
                    key={index}
                    star={star}
                    progress={progress}
                    cls="light-blue"
                  />
                );
              })
            : null}
        </div>
        <div className="overall-content">
          {averageSearchData && (
            <Stars
              totalData={totalSearchData}
              averageData={averageSearchData}
              activeColor="#2F80ED"
              start_date={selectedDate.start_date}
              end_date={selectedDate.end_date}
            />
          )}
          {progressSearchData
            ? progressSearchData.map((value, index) => {
                const star = 5 - index;
                const originalIndex = 4 - index;
                const progress = progressSearchData[originalIndex];
                return (
                  <IndividualProgressBar
                    key={index}
                    star={star}
                    progress={progress}
                    cls="dark-blue"
                  />
                );
              })
            : null}
        </div>
      </div>
      <div className="feedback-participation">
        {feedbackVolumeData ? (
          <DoubleLineChart data={feedbackVolumeData} yField="total" />
        ) : null}
      </div>
      <div className="feedback-ratingOverTime">
        {feedbackRatioData ? (
          <DoubleLineChart data={feedbackRatioData} yField="ratio" />
        ) : null}
      </div>
    </div>
  );
}
export default FeedBack;
