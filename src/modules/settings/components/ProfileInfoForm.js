import React from 'react';
import {useForm} from "react-hook-form";
import styled from "styled-components";
import {get} from "lodash";
import FormInput from "../../../components/form-input";
import {Col, Row} from "react-grid-system";
import BaseButton from "../../../components/base-button";

const StyledProfileForm = styled.form`
  
`;

const ProfileInfoForm = ({
                             profile = {firstName: 'James', lastName: 'Bond'}, edit = () => {
    }, ...props
                         }) => {
    const {register, handleSubmit, setError, formState: {errors}} = useForm();
    const onSubmit = (data) => {
        edit({...data, setError});
    }
    return (
        <StyledProfileForm {...props} onSubmit={handleSubmit(onSubmit)}>
            <Row className={'mb-8'}>
                <Col xs={4}>
                    <FormInput register={register}
                               defaultValue={get(profile, 'firstName', null)}
                               name={'firstName'} label={'First Name'} validation={{required: true}}
                               error={errors?.firstName}/>
                </Col>
            </Row>
            <Row className={'mb-16'}>
                <Col xs={4}>
                    <FormInput register={register}
                               defaultValue={get(profile, 'lastName', null)}
                               name={'lastName'} label={'Last Name'} validation={{required: true}}
                               error={errors?.lastName}/>
                </Col>
            </Row>
            <Row>
                <Col xs={4} offset={{xs:2}} ><BaseButton type={'button'} primary type={'submit'}>Save</BaseButton></Col>
            </Row>
        </StyledProfileForm>
    );
};

export default ProfileInfoForm;
