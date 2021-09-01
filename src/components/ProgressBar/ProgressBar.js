import React from 'react';
import "../../assets/pages.css";
import PropTypes from 'prop-types';

export const IndividualProgressBar = ({cls,progress,star}) => {
    const percent = Number.isInteger(progress + 0.5) || Number.isInteger(progress) ? `${progress}` : progress.toFixed(2);
    return(
        <div className="progress-container">
            <div className="prog-content">
                <span className="content-text"> {star} stars</span>
                <div className="progress">
                    <div className={`progress-bar ${cls}`} style={{width: `${progress}%`}}></div>
                </div>
                <span className="content-subtext"> {`${percent}%`} </span>
            </div>
        </div>
    )
}
IndividualProgressBar.prototype = {
    progress:PropTypes.number,
    star:PropTypes.number
}
