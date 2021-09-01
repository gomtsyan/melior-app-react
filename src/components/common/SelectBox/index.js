import React from "react";
import Select, { components } from "react-select";
import "./index.css";

const SelectBox = (props) => {
  const {
    value,
    isMulti,
    placeholder,
    noOptionsMessage,
    onChange,
    isLoading,
    options,
    selectErrorClass,
    classes,
    isClearable,
  } = props;

  return (
    <Select
      components={components}
      isClearable={!!isClearable}
      isLoading={isLoading}
      className={`selectbox form-control ${selectErrorClass} ${classes}`}
      classNamePrefix="selectbox"
      placeholder={placeholder || ""}
      noOptionsMessage={() => noOptionsMessage || "No results found"}
      isMulti={isMulti}
      value={value}
      onChange={onChange}
      options={options}
    />
  );
};

export default SelectBox;
