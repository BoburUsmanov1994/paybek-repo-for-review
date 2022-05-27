import React from 'react';
import styled from "styled-components";
import {Col, Row} from "react-grid-system";
import Text from "../text";
import Flex from "../flex";

const StyledFormInput = styled.div`
  label {
    color: #1C1C1C;
    font-weight: 500;
    font-size: 14px;
    margin-top: 8px;
    display: block;
  }

  input {
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    //border: 1px solid ${({error}) => error ? '#E92C2C' : '#E8E8E8'};
    border:1px solid #E8E8E8;
    min-width: 333px;
    padding: 8px 12px;
    outline: none;
    color: #1C1C1C;
    font-weight: 500;
    font-size: 16px;
    width: 100%;

    &::placeholder {
      color: rgba(0, 0, 0, 0.7);
    }
  }

  span {
    margin-top: 3px;
  }
`;

const FormInput = ({
                       register = null,
                       label,
                       name,
                       placeholder,
                       type = 'text',
                       validation,
                       error,
                       defaultValue = '',
                       disabled = false,
                       left = 4,
                       right = 8,
                       measure = null,
                       ...props
                   }) => {
    return (
        <StyledFormInput error={error} {...props}>
            <Row>
                <Col xs={left}>
                    <label>{label}</label>
                </Col>
                <Col xs={right}>
                    <Row>
                        <Col xs={12}>
                            {measure ? <Flex>
                                <input {...register(name, {...validation})} defaultValue={defaultValue}
                                       disabled={disabled}
                                       placeholder={placeholder}
                                       type={type}/> {measure}</Flex> :  <input {...register(name, {...validation})} defaultValue={defaultValue}
                                                                                disabled={disabled}
                                                                                placeholder={placeholder}
                                                                                type={type}/>
                            }
                        </Col>
                        <Col xs={12}>
                            <Text xs danger>{error && error.type == 'required' && `${label} is required`}</Text>
                            <Text xs danger>{error && error.type == 'pattern' && `${label} is not valid`}</Text>
                            <Text xs danger>{error && error.type == 'validation' && `${error.message} `}</Text>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </StyledFormInput>
    );
};

export default FormInput;
