import React from 'react';
import styled,{css} from "styled-components";
import arrowIcon from "../../assets/images/icons/arrow-down.svg";
import Select from 'react-select';
import {ReactSVG} from "react-svg";

const StyledBaseSelect = styled.div`
  width: ${({width}) => width || '250px'};
  margin:${({margin}) => margin || '0px'};
  font-size: 14px;
  color:#1C1C1C;
  font-weight: 500;
  cursor: pointer;
  .select-arrow {
    margin-right: 10px;
    margin-left: 5px;
  }
  
  ${({sm}) => sm && css`
    font-size: 13px;
  `};
`;

const customStyles = ({sm}) => ({
    control: (base, state) => ({
        ...base,
        background: "#fff",
        borderColor: "#E8E8E8",
        borderRadius: '8px',
        minHeight: sm ? '28px' : '36px',
        boxShadow: '0px 1px 1px rgb(0 0 0 / 6%)',
        "&:hover": {
            borderColor: 'none'
        }
    }),
    indicatorSeparator: (base, state) => ({
        ...base,
        display: 'none'
    })
});

const DropdownIndicator = (props) => {
    return (<ReactSVG className={'select-arrow'} src={arrowIcon}/>);
}

const BaseSelect = React.forwardRef(({
        options = [], 
        placeholder='Select',
        value="",
        isSearchable=false,  
        disabled = false,
        isMulti = false,
        defaultValue,
        isLoading = false,
        defaultOptions,
        handleChange = (value) => console.log(value),
        sm,
        ...props
    }, ref) => {
    return (
        <StyledBaseSelect sm={sm} {...props}>
            <Select
                ref={ref}
                clearIndicator={true}
                options={options}
                disabled={disabled}
                placeholder={placeholder}
                onChange={(value) => handleChange(value)}
                defaultValue={
                    isMulti ? defaultValue : options.filter(option =>
                        option.value === defaultValue)
                }
                defaultOptions = {isMulti ? defaultOptions : options.filter(option =>
                    option.value === defaultOptions)}
                styles={customStyles({sm})}
                components={{DropdownIndicator}}
                isMulti={isMulti}
                isSearchable={isSearchable}
                isLoading={isLoading}
            />
        </StyledBaseSelect>
    );
});

export default BaseSelect;
