import React, { Fragment, useState } from "react";
import "../../../assets/pages.css";
import PropTypes from "prop-types";

const data = [
    {
        id: 1,
        text: "Weekly",
    },
    {
        id: 2,
        text: "Monthly",
    },
    {
        id: 3,
        text: "Yearly",
    },
];
const Button = ({ onChange, value }) => {
    const [state] = useState(data);

    return (
        <Fragment>
            {state.map(({ text, id }) => (
                <button className={`date-btn ${value === id ? "active-btn" :""}`} key={id} onClick={() => onChange(id)}>
                    {text}
                </button>
            ))}
        </Fragment>
    );
};
Button.propTypes = {
    text: PropTypes.string,
    id: PropTypes.string,
};
export default Button;
