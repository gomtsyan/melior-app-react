import React from "react";
import { DatePicker, Space } from "antd";
import moment from "moment";

function disabledDateFrom(current, endValue) {
  const end = moment(endValue);
  const disable = endValue ? current > end : moment() < current;
  return disable;
}

function disabledDateTo(current, startValue) {
  const start = moment(startValue);
  const disable = startValue
    ? current < start || moment() < current
    : moment() < current;
  return disable;
}

export const DateCalendarFrom = ({ onChange, value, endValue }) => {
  return (
    <div className="data-picker-one">
      <span className="cal-title">From</span>
      <Space direction="vertical">
        <DatePicker
          onChange={(data, dateString) => onChange(dateString)}
          value={value ? moment(value) : null}
          disabledDate={(current) => disabledDateFrom(current, endValue)}
        />
      </Space>
    </div>
  );
};

export const DateCalendarTo = ({ onChange, value, startValue }) => {
  return (
    <div className="data-picker-one">
      <span className="cal-title">To</span>
      <Space direction="vertical">
        <DatePicker
          onChange={(data, dateString) => onChange(dateString)}
          value={value ? moment(value) : null}
          disabledDate={(current) => disabledDateTo(current, startValue)}
        />
      </Space>
    </div>
  );
};

export default DatePicker;
