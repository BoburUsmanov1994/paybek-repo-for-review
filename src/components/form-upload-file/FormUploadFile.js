import React from 'react';
import styled from "styled-components";
import {Col, Row} from "react-grid-system";
import Text from "../text";

const StyledFormUploadFile = styled.div`


  .file {
    position: relative;
    height: 36px;

    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      height: 36px;
    }

    span {
      display: inline-block;
      padding: 8px 16px;
      background-color: #8A8D9D;
      font-size: 16px;
      font-weight: 500;
      color: #fff;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 2px 1px rgba(0, 0, 0, 0.06), 0px 1px 1px rgba(0, 0, 0, 0.08);
      border-radius: 8px;
      cursor: pointer;
      height: 36px;
    }

    &__name {
      padding: 6px 12px;
      background: #FFFFFF;
      border: 1px solid #E8E8E8;
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.06);
      border-radius: 8px;
      min-height: 36px;
    }
  }

  span {
    margin-top: 3px;
  }
`;

const FormUploadFile = ({
                            register = null,
                            label,
                            name,
                            placeholder,
                            type = 'file',
                            validation,
                            error,
                            defaultValue = '',
                            disabled = false,
                            fileName = '',
                            left = 4,
                            right = 8,
                            ...props
                        }) => {
    return (
        <StyledFormUploadFile error={error} {...props}>
            <Row align={'center'}>
                <Col xs={left}>
                    <label>{label}</label>
                </Col>
                <Col xs={right}>
                    <Row align={'center'}>
                        <Col xs={7}>
                            <div className={'file__name'}>{fileName}</div>
                        </Col>
                        <Col xs={5}>
                            <label htmlFor="#file" className={'file'}>
                                <input id={'file'} {...register(name, {...validation})} defaultValue={defaultValue}
                                       disabled={disabled}
                                       placeholder={placeholder}
                                       type={type}/>
                                <span>Choose File</span>
                            </label>
                        </Col>
                        <Col xs={12}>
                            {error && <Text danger>{error.type == 'required' && `${label} is required`}</Text>}
                            {error && <Text xs danger>{error.type == 'pattern' && `${label} is not valid`}</Text>}
                            {error && <Text xs danger>{error.type == 'validation' && `${error.message} `}</Text>}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </StyledFormUploadFile>
    );
};

export default FormUploadFile;
