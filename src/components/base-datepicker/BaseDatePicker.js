import React, {useEffect, useState} from 'react';
import DatePicker from "react-datepicker";
import moment from "moment";
import styled from "styled-components";
import {ReactSVG} from "react-svg";
import "react-datepicker/dist/react-datepicker.css";
import calendarIcon from "../../assets/images/icons/calendar.svg";
import arrowIcon from "../../assets/images/icons/arrow-down.svg";

const StyledBaseDatepicker = styled.div`
  position: relative;
  background: #FFFFFF;
  border: 1px solid #E8E8E8;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.06);
  padding: 8px 12px;
  height: 35px;
  border-radius: 8px;
  min-width: 150px;
  margin:${({margin}) => margin || '0px'};
  width:${({width}) => width || 'auto'};
  .calendar-icon{
    position: absolute;
    top: 5px;
    left: 10px;
  }
  .arrow-icon{
    position: absolute;
    top: 50%;
    transform: translateY(-60%);
    right: 10px;
  }
  .react-datepicker-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    .react-datepicker__input-container{
      input{
        width: 100%;
        background: transparent;
        font-weight: 500;
        font-size: 14px;
        color: #1C1C1C;
        border:none;
        outline: none;
        padding: 8px 15px 8px 35px;
      }
    }
  }
`;
const BaseDatePicker = ({defaultDate = null,value='',placeholder='',dateFormat="dd/MM/yyyy", showTimeSelect = false,handleDate = (date) => {console.log(date)},...props}) => {
    const [startDate, setStartDate] = useState(defaultDate);
    const selectDate = (date) => {
        setStartDate(date);
        handleDate(date);
    }
    useEffect(()=>{
        if(value) {
            setStartDate(moment(value).toDate());
        }
    },[value])
    return (
        <StyledBaseDatepicker {...props}>
            <ReactSVG className={'calendar-icon'} src={calendarIcon}/>
            <DatePicker showTimeSelect={showTimeSelect} dateFormat={dateFormat} value={startDate} selected={startDate} placeholderText={placeholder} onChange={(date) => selectDate(date)} />
            <ReactSVG className={'arrow-icon'} src={arrowIcon}/>
        </StyledBaseDatepicker>
    );
};

export default BaseDatePicker;
