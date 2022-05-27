import React,{useState} from 'react';
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {isEmpty} from "lodash";
import {useHistory} from "react-router-dom";
import {Container,Row,Col} from "react-grid-system";
import BaseButton from "../../../components/base-button";
import FormInput from "../../../components/form-input";
import Title from "../../../components/title";
import Text from "../../../components/text";
import Flex from "../../../components/flex";

const StyledForgotPasswordForm = styled.form`
  width: 40%;
  margin: 0 auto;
  margin-top: 40px;
  
  .row{
    margin-bottom: 20px;
  }

`;

const ForgotPasswordForm = ({forgotPassword = () => {},...props}) => {
    const history = useHistory();
    const { register, handleSubmit,setError,formState: { errors } } = useForm();
    const onSubmit = (data) =>{
        forgotPassword({data,setError});
    }
    return (
        <StyledForgotPasswordForm {...props} onSubmit={handleSubmit(onSubmit)}>
            <Container fluid>
                <Row className={'mb-32'}>
                    <Col xs={12} className={'text-center'}>
                        <Title lg>Reset your password</Title>
                        <Text small>We’ll email you a link to reset your password.</Text>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className={'mb-16'}>
                        <FormInput left={3} right={9}  register={register} name={'email'} label={'Email'} placeholder={'Please enter your Paybek email ...'} validation={{required:true,pattern:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}} error={errors?.email} />
                    </Col>
                    <Col xs={9} offset={{ xs: 3 }}>
                        <Flex><BaseButton disabled={!isEmpty(errors)} type={'submit'} primary medium className={'mr-16'}>Submit</BaseButton>
                            <BaseButton handleClick={() => history.push('/auth')}   medium>Cancel</BaseButton></Flex>
                    </Col>
                </Row>
            </Container>
        </StyledForgotPasswordForm>
    );
};

export default ForgotPasswordForm;
