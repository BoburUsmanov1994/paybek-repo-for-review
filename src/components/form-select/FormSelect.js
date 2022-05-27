import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Select from "react-select";
import { Col, Row } from "react-grid-system";
import Text from "../text";
import arrowIcon from "../../assets/images/icons/arrow-down.svg";
import { ReactSVG } from "react-svg";

const StyledFormSelect = styled.div`
    label {
        color: #1c1c1c;
        font-weight: 500;
        font-size: 14px;
    }

    label + div {
        width: ${({ width }) => width || "333px"};
    }

    span {
        margin-top: 3px;
    }

    .select-arrow {
        margin-right: 10px;
        margin-left: 5px;
    }
`;

const FormSelect = ({
    options = [],
    setValue,
    label,
    name,
    placeholder,
    validation,
    error,
    defaultValue = "",
    disabled = false,
    Controller,
    control,
    isMulti = false,
    left = 4,
    right = 8,
    rule = {},
    ...props
}) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue);
    useEffect(() => {
        setValue(name, defaultValue);
    }, [defaultValue]);
    const customStyles = {
        control: (base, state) => ({
            ...base,
            background: "#fff",
            borderColor: "#E8E8E8",
            borderRadius: "8px",
            boxShadow: "0px 1px 1px rgb(0 0 0 / 6%)",
            "&:hover": {
                borderColor: "none",
            },
        }),
        indicatorSeparator: (base, state) => ({
            ...base,
            display: "none",
        }),
    };

    const DropdownIndicator = (props) => {
        return <ReactSVG className={"select-arrow"} src={arrowIcon} />;
    };

    const handleChange = (value) => {
        setSelectedValue(value.value);
        setValue(
            name,
            isMulti ? [...value.map((item) => item.value)] : value.value
        );
    };
    return (
        <StyledFormSelect error={error} {...props}>
            <Row align={"center"}>
                <Col xs={left}>
                    <label>{label}</label>
                </Col>
                <Col xs={right}>
                    <Row>
                        <Col xs={12}>
                            <Controller
                                control={control}
                                name={name}
                                rules={rule}
                                render={() => (
                                    <Select
                                        clearIndicator={true}
                                        options={options}
                                        isDisabled={disabled}
                                        placeholder={placeholder}
                                        onChange={handleChange}
                                        styles={customStyles}
                                        components={{ DropdownIndicator }}
                                        isMulti={isMulti}
                                        value={
                                            isMulti
                                                ? selectedValue
                                                : options.filter(
                                                      (option) =>
                                                          option.value ===
                                                          selectedValue
                                                  )
                                        }
                                    />
                                )}
                            />
                        </Col>
                        <Col xs={12}>
                            {error && (
                                <Text xs danger>
                                    {error.type == "required" &&
                                        `${label} is required`}
                                </Text>
                            )}
                            {error && (
                                <Text xs danger>
                                    {error.type == "pattern" &&
                                        `${label} is not valid`}
                                </Text>
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </StyledFormSelect>
    );
};

export default FormSelect;
