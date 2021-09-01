import React from "react";
import "../../assets/pages.css";
import moment from "moment";

const getStarDate = (averageData) => {
  return Math.round((averageData / 5) * 100) + "%";
};
function Stars({ totalData, averageData, activeColor, start_date, end_date }) {
  const value = getStarDate(averageData ? averageData.average : 0);
  const starValue = averageData ? averageData.average.toFixed(1) : 0;

  var text = "";
  if (start_date || end_date) {
    text += (totalData ? totalData.total : "") + " ratings";
    if (start_date) {
      text += " from " + moment(start_date).format("LL");
    }
    if (end_date) {
      text += " to " + moment(end_date).format("LL");
    }
  } else {
    text = (totalData ? totalData.total : "") + " lifetime ratings";
  }
  return (
    <div className={`${totalData ? "stars" : "hidden"}`}>
      <div className="star-container">
        <div className="rating-stars"></div>
        <div
          className="star-color"
          style={{ width: `${value}`, background: `${activeColor}` }}
        ></div>
      </div>
      <h2 className="stars-text">{starValue} out of 5 stars</h2>
      <p className="stars-subtext">{text}</p>
    </div>
  );
}

export default Stars;
