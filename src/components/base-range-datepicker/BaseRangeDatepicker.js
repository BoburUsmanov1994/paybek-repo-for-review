import React from 'react';
import { DateRangePicker } from 'react-date-range';

const BaseRangeDatepicker = ({defaultValue={
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
},handleSelect=(ranges)=>console.log(ranges)}) => {
    return (
        <DateRangePicker
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            ranges={[defaultValue]}
            onChange={handleSelect}
        />
    );
};

export default BaseRangeDatepicker;
