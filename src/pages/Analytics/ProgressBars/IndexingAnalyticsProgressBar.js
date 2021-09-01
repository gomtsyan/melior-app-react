import React from "react";
import "react-circular-progressbar/dist/styles.css";
import '../../../assets/pages.css'
import {CircularProgressbarWithChildren} from "react-circular-progressbar";
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./ProgressAnimation";
import Humanize from "humanize-plus";
import PropTypes from 'prop-types';
import { APIBaseURI, dataTotalCrawledEndpoint, dataTotalIndexableEndpoint, indexTotalIndexedEndpoint } from "../../../constants";

class ProgBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded1: false,
            isLoaded2: false,
            isLoaded3: false,
            items: [],
            total: 0,
            indexed: 0,
            totalValue: 0,
            indexableValue: 0,
            indexedValue: 0,
        };
    }
    componentDidMount() {
        fetch(APIBaseURI+dataTotalCrawledEndpoint)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded1: true,
                        total: result,
                        totalValue:Humanize.compactInteger(result, 1)
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded1: true,
                        error
                    });
                }
            )
        fetch(APIBaseURI + dataTotalIndexableEndpoint )
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded2: true,
                        items: result,
                        indexableValue:Humanize.compactInteger(result.indexable, 1)
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded2: true,
                        error
                    });
                }
            )
        fetch(APIBaseURI+indexTotalIndexedEndpoint)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded3: true,
                        indexed: result,
                        indexedValue: Humanize.compactInteger(result, 1)
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded3: true,
                        error
                    });
                }
            )
    }

    render() {
        const {error, isLoaded1, isLoaded2, isLoaded3, total ,items, indexed, totalValue, indexableValue, indexedValue} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (isLoaded1 && isLoaded2 && isLoaded3) {
            return (
                <div className='both-bars'>
                    <div className='progress-wrapper'>
                        <h2 className='prog-title'>Content Overview</h2>
                        <div className="ex-container">
                            <Example>
                                <AnimatedProgressProvider
                                    valueStart={0}
                                    valueEnd={total}
                                    duration={1.4}
                                    easingFunction={easeQuadInOut}
                                >
                                    {value => {
                                        const roundedValue = Math.round(value);
                                        return (
                                            <CircularProgressbarWithChildren
                                                value={value}
                                                text={totalValue}
                                                styles={{
                                                    root: {},
                                                    path: {
                                                        stroke: `rgba(86, 204, 242, 1) ${value / 100})`,
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
                                                        fill: 'rgba(86, 204, 242, 1)',
                                                    },
                                                }}
                                            >
                                                <div style={{
                                                    fontSize: 12,
                                                    marginTop: 50,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: "space-between",
                                                }}>
                                                    <div className="circle-title">Total Content Items</div>
                                                    <div children={`${Math.round(roundedValue * 100 / total)}%`} className='circle-text'></div>
                                                </div>
                                            </CircularProgressbarWithChildren>
                                        );
                                    }}
                                </AnimatedProgressProvider>
                            </Example>
                            <Example>
                                <AnimatedProgressProvider
                                    valueStart={0}
                                    valueEnd={items["indexable_ratio"]}
                                    duration={1.4}
                                    easingFunction={easeQuadInOut}
                                >
                                    {value => {
                                        const roundedValue = value;
                                        return (
                                            <CircularProgressbarWithChildren
                                                value={value}
                                                strokeWidth={10}
                                                text={indexableValue}
                                                styles={{
                                                    root: {},
                                                    path: {
                                                        stroke: `rgba(86, 204, 242, 1) ${value / 80})`,
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
                                                        fill: 'rgba(86, 204, 242, 1)',
                                                    }
                                                }}
                                            >
                                                <div style={{
                                                    fontSize: 12,
                                                    marginTop: 50,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <div className="circle-title">Indexable Content</div>
                                                    <div children={`${Math.round(roundedValue)}%`}
                                                         className='circle-text'></div>
                                                </div>
                                            </CircularProgressbarWithChildren>
                                        );
                                    }}
                                </AnimatedProgressProvider>
                            </Example>
                        </div>

                    </div>
                    <div className='progress-second-wrapper'>
                        <h2 className='prog-title'>Index Overview</h2>
                        <div className="ex-container">
                            <Example >
                                <AnimatedProgressProvider
                                    valueStart={0}
                                    valueEnd={indexed*100/items['indexable']}
                                    duration={1.4}
                                    easingFunction={easeQuadInOut}
                                >
                                    {value => {
                                        return (
                                            <CircularProgressbarWithChildren
                                                value={value}
                                                text={indexedValue}
                                                styles={{
                                                    root: {},
                                                    path: {
                                                        stroke: `rgba(47, 128, 237, 1) ${value / 100})`,
                                                        strokeWidth:'4px',
                                                        strokeLinecap: 'butt',
                                                        transition: 'stroke-dashoffset 0.9s ease 0s',
                                                        transform: 'rotate(0.25)',
                                                        transformOrigin: 'center center',
                                                    },
                                                    trail: {
                                                        stroke: '#EFEFEF',
                                                        strokeWidth:'4px',
                                                        strokeLinecap: 'butt',
                                                        transform: 'rotate(0.25turn)',
                                                        transformOrigin: 'center center',
                                                    },
                                                    text: {
                                                        fill: '#4A4A4A',
                                                        fontSize: '24px',
                                                    },
                                                    background: {
                                                        fill: '#2F80ED',
                                                    },
                                                }}
                                            >
                                                <div style={{ fontSize: 12, marginTop: 55 ,display:'flex',flexDirection:'column', alignItems:'center'}}>
                                                    <div className='circle-title-second'>Items Indexed</div>
                                                </div>
                                            </CircularProgressbarWithChildren>
                                        );
                                    }}
                                </AnimatedProgressProvider>
                            </Example>
                            <Example >
                                <AnimatedProgressProvider
                                    valueStart={0}
                                    valueEnd={indexed*100/items['indexable']}
                                    duration={1.4}
                                    easingFunction={easeQuadInOut}

                                >
                                    {value => {
                                        const roundedValue = value;
                                        return (
                                            <CircularProgressbarWithChildren
                                                value={value}
                                                strokeWidth={10}
                                                text={`${Math.round(roundedValue)}%`}
                                                styles={{
                                                    root: {},
                                                    path: {
                                                        stroke: `rgba(47, 128, 237, 1) ${value / 100})`,
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
                                                        fill: '#2F80ED',
                                                    }
                                                }}
                                            >
                                                <div style={{ fontSize: 12, marginTop: 60 ,display:'flex',flexDirection:'column', alignItems:'center'}}>
                                                    <div className='circle-title-second'>Of Indexable Items</div>
                                                </div>
                                            </CircularProgressbarWithChildren>
                                        );
                                    }}
                                </AnimatedProgressProvider>
                            </Example>
                            <Example >
                                <AnimatedProgressProvider
                                    valueStart={0}
                                    valueEnd={indexed*100/total}
                                    duration={1.4}
                                    easingFunction={easeQuadInOut}

                                >
                                    {value => {
                                        const roundedValue = value;
                                        return (
                                            <CircularProgressbarWithChildren
                                                value={value}
                                                strokeWidth={10}
                                                text={`${Math.round(roundedValue)}%`}
                                                styles={{
                                                    style:{
                                                        marginTop:'-95%'
                                                    },
                                                    path: {
                                                        stroke: `rgba(47, 128, 237, 1) ${value / 100})`,
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
                                                        fill: '#2F80ED',
                                                    }
                                                }}
                                            >
                                                <div style={{ fontSize: 12, marginTop: 60 ,display:'flex',flexDirection:'column',alignItems:'center'}}>
                                                    <div className='circle-title-second'>Of All Content</div>
                                                </div>
                                            </CircularProgressbarWithChildren>
                                        );
                                    }}
                                </AnimatedProgressProvider>
                            </Example>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <div>Loading...</div>;
        }
    }
};
function Example(props) {
    return (
        <div >
            <div style={{ marginTop: 0, display: "flex", justifyContent:"space-between" }}>
                <div style={{ width: 150}} className="progress-circles">{props.children}</div>
                <div>
                    <h3 className="h5">{props.label}</h3>
                    <p>{props.description}</p>
                </div>
            </div>
        </div>
    );
}
ProgBar.propTypes = {
    items : PropTypes.array,
    totalValue : PropTypes.string,
    total : PropTypes.number,
    indexableValue:PropTypes.oneOfType ([
        PropTypes.number,
        PropTypes.string,
    ]),
    indexedValue:PropTypes.oneOfType ([
        PropTypes.number,
        PropTypes.string,
    ]),
}
export default ProgBar
