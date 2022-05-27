import React from 'react';
import {useForm} from "react-hook-form";
import styled from "styled-components";
import FormInput from "../../../components/form-input";
import {Row,Col} from "react-grid-system";
import BaseButton from "../../../components/base-button";

const StyledProfileForm = styled.form`

`;

const ProfileChangePasswordForm = ({
                              changePassword = () => {
    }, ...props
                         }) => {
    const {register, handleSubmit, setError, formState: {errors}} = useForm();
    const onSubmit = (data) => {
        changePassword({...data,setError});
    }
    return (
        <StyledProfileForm {...props} onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col xs={6}>
                    <FormInput register={register}
                               name={'currentPassword'} label={'Current password'} type={'password'} validation={{required:true}} error={errors?.currentPassword}/>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <FormInput register={register}
                               name={'newPassword'} label={'New password'} type={'password'} validation={{required:true}} error={errors?.newPassword}/>
                </Col>
            </Row>
            <Row className={'mb-16'}>
                <Col xs={6}>
                    <FormInput register={register}
                               name={'confirmNewPassword'} label={'Confirm new password'} type={'password'} validation={{required:true}} error={errors?.confirmNewPassword}/>
                </Col>
            </Row>
            <Row>
                <Col xs={6} offset={{xs:2}}>
                    <BaseButton type={'button'} primary type={'submit'}>Save</BaseButton>
                </Col>
            </Row>
        </StyledProfileForm>
    );
};

export default ProfileChangePasswordForm;
