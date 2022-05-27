import React from 'react';
import styled from "styled-components";

const StyledBaseTable = styled.table`
  text-align: center;
  width: 100%;
  border-collapse: collapse;
  margin:${({margin}) => margin || '0px'};
  min-height: 10vh;
  tr {
    min-height: unset;
    th, td {
      padding: 15px;
    }

    th {
      width: 100px;
      font-size: 12px;
      color: #969696;
      font-weight: 500;
      border-bottom: 1px solid #E8E8E8;
    }

    td {
      font-size: 13px;
      color: #585757;
      border-bottom: 1px solid #E8E8E8;
      min-width: ${({minWidth}) => minWidth || ''}
    }

  }
`;

const BaseTable = ({children, tableHeader = [],...props}) => {
    return (
        <div style={{overflowX:'auto'}}>
            <StyledBaseTable {...props}>
                <thead>
                <tr>
                    {tableHeader && tableHeader.map((item, index) => <th key={index}>{item}</th>)}
                </tr>
                </thead>
                <tbody>
                {children}
                </tbody>
            </StyledBaseTable>
        </div>
    );
};

export default BaseTable;
