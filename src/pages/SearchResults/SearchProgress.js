import React from "react";
import "react-circular-progressbar/dist/styles.css";
import '../../assets/pages.css'
import {CircularProgressbarWithChildren} from "react-circular-progressbar";
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./ProgressAnimation";
import PropTypes from 'prop-types';


const SearchProgress = ({ percent, title, background ,maxWidth ,marginBottom , marginTop}) => {
    return (
        <div className="progress-container">
            <Example>
                <AnimatedProgressProvider
                    valueStart={0}
                    valueEnd={percent}
                    duration={1.4}
                    easingFunction={easeQuadInOut}
                >
                    {value => {
                        // const roundedValue = Math.round(value);
                        return (
                            <CircularProgressbarWithChildren
                                value={value}
                                styles={{
                                    root: {},
                                    path: {
                                        stroke: `${background}${value / 100})`,
                                        strokeWidth: '4px',
                                        strokeLinecap: 'butt',
                                        transition: 'stroke-dashoffset 0.9s ease 0s',
                                        transform: 'rotate(0.25)',
                                        transformOrigin: 'center center',
                                    },
                                    trail: {
                                        stroke: '#EFEFEF',
                                        strokeWidth: '4px',
                                        strokeLinecap: 'butt',
                                        transform: 'rotate(0.25turn)',
                                        transformOrigin: 'center center',
                                    },
                                    text: {
                                        fill: '#4A4A4A',
                                        fontSize: '24px',
                                    },
                                    background: {
                                        fill: `${background}`,
                                    },
                                }}
                            >
                                <div className="search-circle-title" style={{maxWidth:`${maxWidth}px`,  marginBottom:`${marginBottom}px`, marginTop:`${marginTop}px`}}>{title}</div>
                                <div style={{
                                    fontSize: 12,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: "space-between",
                                }}>
                                    <div children={`${percent}%`}
                                         className='search-circle-text'></div>
                                </div>
                            </CircularProgressbarWithChildren>
                        );
                    }}
                </AnimatedProgressProvider>
            </Example>

        </div>

    );
}
function Example(props) {
    return (
        <div>
            <div style={{marginTop: 0, display: "flex", justifyContent: "space-between"}}>
                <div style={{width: 150}} className="progress-circles">{props.children}</div>
                <div>
                    <h3 className="h5">{props.label}</h3>
                    <p>{props.description}</p>
                </div>
            </div>
        </div>
    );
}
SearchProgress.propTypes = {
    percent: PropTypes.number,
    maxWidth: PropTypes.number,
    marginBottom:PropTypes.number,
    marginTop:PropTypes.number,
    background:PropTypes.string,
    title:PropTypes.string
}
export default SearchProgress
