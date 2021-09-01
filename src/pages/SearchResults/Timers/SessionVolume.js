import React from "react";
import "../../../assets/pages.css";
import PropTypes from 'prop-types';

const SessionVolume = ({text, number, margin, lineHeight, maxWidth}) => {

    return (
        <div className="session">
            <h2 className="session-title"
                style={{
                    lineHeight: `${lineHeight}px`,
                    maxWidth: `${maxWidth}px`
                }}>
                {text}
            </h2>
            <span className="session-number" style={{marginTop: margin}}>
                {number}
            </span>
        </div>
    );
}

SessionVolume.propTypes = {
    number:PropTypes.oneOfType ([
        PropTypes.number,
        PropTypes.string,
    ]),
    maxWidth: PropTypes.number,
    lineHeight:PropTypes.number,
    margin:PropTypes.number,
    text:PropTypes.string
}
export default SessionVolume
