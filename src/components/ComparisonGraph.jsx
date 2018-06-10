import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
// import { render } from 'react-dom'
import { ResponsiveLine } from '@nivo/line';

import { graphDataSelector } from '../state/selectors/stock-selectors';

import '../styles/stocks.scss';

class ComparisonGraph extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        const {
            graphData,
        } = this.props;

        return <div className='comparison-graph'>
             <ResponsiveLine
                data={graphData}
                margin={{
                    "top": 50,
                    "right": 110,
                    "bottom": 50,
                    "left": 60
                }}
                minY="auto"
                stacked={false}
                curve="natural"
                // maxY="370"
                // minY="10"
                axisBottom={{
                    "orient": "bottom",
                    "tickSize": 5,
                    "tickPadding": 20,
                    "tickRotation": 0,
                    "legend": "time",
                    "legendOffset": 50,
                    "legendPosition": "center"
                }}
                axisLeft={{
                    "orient": "left",
                    "tickSize": 5,
                    "tickPadding": 5,
                    "tickRotation": 0,
                    "legend": "price",
                    "legendOffset": -40,
                    "legendPosition": "center"
                }}
                dotSize={10}
                dotColor="inherit:darker(0.3)"
                dotBorderWidth={2}
                dotBorderColor="#ffffff"
                enableDotLabel={true}
                dotLabel="y"
                dotLabelYOffset={-12}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                legends={[
                    {
                        "anchor": "bottom-right",
                        "direction": "column",
                        "translateX": 100,
                        "itemWidth": 80,
                        "itemHeight": 20,
                        "symbolSize": 12,
                        "symbolShape": "circle"
                    }
                ]}
            />
        </div>
    }
};

export default connect(
    (state) => ({
        graphData: graphDataSelector(state),
    }),
    (dispatch) => ({
    }),
)(ComparisonGraph);
