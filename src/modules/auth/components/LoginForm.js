import React,{useState} from 'react';
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {isEmpty} from "lodash";
import {Container,Row,Col} from "react-grid-system";
import BaseButton from "../../../components/base-button";
import FormInput from "../../../components/form-input";
import {Link} from "react-router-dom";
import Text from "../../../components/text";

const StyledLoginForm = styled.form`
  width: 40%;
  margin: 0 auto;
  margin-top: 125px;
  
  .row{
    margin-bottom: 20px;
  }

  
`;

const LoginForm = ({login = () => {},...props}) => {
    const { register, handleSubmit,setError,formState: { errors } } = useForm();
    const onSubmit = (data) =>{
        login({data,setError});
    }
    return (
        <StyledLoginForm {...props} onSubmit={handleSubmit(onSubmit)}>
            <Container fluid>
           <Row>
               <Col xs={12} className={'mb-16'}>
                   <FormInput  register={register} name={'email'} label={'Email'} placeholder={'Email'} validation={{required:true,pattern:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}} error={errors?.email} />
               </Col>
           <Col xs={12} className={'mb-16'}>
               <FormInput register={register} name={'password'} label={'Password'} placeholder={'Password'} type={'password'} validation={{required:true}} error={errors?.password} />
           </Col>
           <Col xs={8} offset={{ xs: 4 }} className={'mb-32'}>
               <BaseButton disabled={!isEmpty(errors)} type={'submit'} primary medium>Login</BaseButton>
           </Col>
               <Col xs={8} offset={{ xs: 4 }}>
                  <Text> <Link className={'reset__link'} to={'/auth/forgot-password'}>Forgot your password?</Link></Text>
               </Col>
           </Row>
            </Container>
        </StyledLoginForm>
    );
};

export default LoginForm;
