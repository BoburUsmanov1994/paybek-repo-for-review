import React from 'react';

const BaseList = ({items=[],children}) => {
    return items && items.map((item,index) => children(item,index));
};

export default BaseList;
