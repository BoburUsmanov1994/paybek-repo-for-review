import React from 'react';
import styled from "styled-components";
import {Col, Row} from "react-grid-system";
import Text from "../text";

const StyledFormTextarea = styled.div`
  label {
    color: #1C1C1C;
    font-weight: 500;
    font-size: 14px;
    display: block;
  }

  textarea {
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    border: 1px solid ${({error}) => error ? '#E92C2C' : '#E8E8E8'};
    min-width: 333px;
    padding: 8px 12px;
    outline: none;
    color: #1C1C1C;
    font-weight: 500;
    font-size: 16px;
    width: 100%;
    min-height: 100px;
    font-family: 'Inter', sans-serif;

    &::placeholder {
      color: rgba(0, 0, 0, 0.7);
    }
  }

  span {
    margin-top: 3px;
  }
`;

const FormTextarea = ({
                          register = null,
                          label,
                          name,
                          placeholder,
                          validation,
                          error,
                          center = 'flex-start',
                          defaultValue = '',
                          disabled = false,
                          left = 4,
                          right = 8,
                          ...props
                      }) => {
    return (
        <StyledFormTextarea error={error} {...props}>
            <Row align={center}>
                <Col xs={left}>
                    <label>{label}</label>
                </Col>
                <Col xs={right}>
                    <Row>
                        <Col xs={12}>
                            <textarea {...register(name, {...validation})} defaultValue={defaultValue}
                                      disabled={disabled}
                                      placeholder={placeholder}
                            ></textarea>
                        </Col>
                        <Col xs={12}>
                            {error && <Text xs danger>{error.type == 'required' && `${label} is required`}</Text>}
                            {error && <Text xs danger>{error.type == 'pattern' && `${label} is not valid`}</Text>}
                            {error && <Text xs danger>{error.type == 'validation' && `${error.message} `}</Text>}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </StyledFormTextarea>
    );
};

export default FormTextarea;
