import React,{useState} from 'react';
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {isEmpty} from "lodash";
import {Container,Row,Col} from "react-grid-system";
import BaseButton from "../../../components/base-button";
import FormInput from "../../../components/form-input";
import Title from "../../../components/title";

const StyledSetPasswordForm = styled.form`
  width: 40%;
  margin: 0 auto;
  margin-top: 40px;
  
  .row{
    margin-bottom: 20px;
  }

`;

const SetPasswordForm = ({setPassword = () => {},...props}) => {
    const { register, handleSubmit,setError,formState: { errors } } = useForm();
    const onSubmit = (data) =>{
        setPassword({data,setError});
    }
    return (
        <StyledSetPasswordForm {...props} onSubmit={handleSubmit(onSubmit)}>
            <Container fluid>
                <Row className={'mb-32'}>
                    <Col xs={12} className={'text-center'}>
                        <Title lg>Set your password</Title>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className={'mb-16'}>
                        <FormInput left={5} right={7}  register={register} name={'password'} label={'Password'} placeholder={'Password'} type={'password'} validation={{required:true}} error={errors?.password} />
                    </Col>
                    <Col xs={12} className={'mb-16'}>
                        <FormInput left={5} right={7} register={register} name={'prePassword'} label={'Password Confirm'} placeholder={'Password Confirm'} type={'password'} validation={{required:true}} error={errors?.prePassword} />
                    </Col>
                    <Col xs={7} offset={{ xs: 5 }}>
                        <BaseButton disabled={!isEmpty(errors)} type={'submit'} primary medium>Confirm</BaseButton>
                    </Col>
                </Row>
            </Container>
        </StyledSetPasswordForm>
    );
};

export default SetPasswordForm;
