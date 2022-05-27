import React from 'react';
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import moment from "moment";
import {get, head, merge, round} from "lodash";
import styled from "styled-components";

const StyledBaseLineChart = styled.div`
  height: ${({height}) => height || '500px'};
  width: ${({width}) => width || '100%'};

  .recharts-legend-wrapper {
    left: 65px !important;
    bottom: 0px !important;
  }
  .recharts-tooltip-wrapper{
    background: #FFFFFF !important;
    box-shadow: 0px 11px 15px rgba(0, 0, 0, 0.1), 0px 9px 46px rgba(0, 0, 0, 0.06), 0px 24px 38px rgba(0, 0, 0, 0.04) !important;
    border-radius: 8px !important;
    border:none !important;
  }
`;

const BaseLineChart = ({
                           data = [],
                           colors = ['#F98600', '#00BA34', '#0085FF'],
                           lines = [],
                           type = 'monotone',
                           date = 'month',
                           ...props
                       }) => {

    

    data = data.map(
        (item) => merge( { name: item['month'] ?? item['year'] ?? item["day"]}, 
        ...lines.map(line => ({ [line]: 0 })), ...get(item, 'values').map(({ country, sum}) => ({[country]: round(sum, 2)}))));


    // data.sort((a, b) => a.name - b.name);
    
    // console.log("data base line chart", data);


    return (
        <StyledBaseLineChart {...props}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 15,
                        left: 0,
                        bottom: 30,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend layout="horizontal" verticalAlign="bottom" align="left" height={36}/>
                    {
                        lines && lines.map((line, index) => <Line key={index} type={type} dataKey={line} strokeWidth={2} stroke={colors[index - 1]} activeDot={{r: 8}}/>)
                    }
                    {/* <Line key={index} type={type} dataKey={line} strokeWidth={2} stroke={colors[index - 1]} activeDot={{r: 8}}/> */}
                </LineChart>
            </ResponsiveContainer>
        </StyledBaseLineChart>
    );
};

export default BaseLineChart;
