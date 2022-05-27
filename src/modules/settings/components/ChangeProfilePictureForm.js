import React,{useState,useEffect} from 'react';
import styled from "styled-components";
import {Row,Col} from "react-grid-system";
import {useForm} from "react-hook-form";
import {get} from "lodash";
import FormUploadFile from "../../../components/form-upload-file";
import BaseButton from "../../../components/base-button";

const StyledChangeProfilePictureForm = styled.form`
`;
const ChangeProfilePictureForm = ({upload,props}) => {
    const {register, handleSubmit, setError,watch,getValues, formState: {errors}} = useForm();
    const [fileName,setFileName] = useState('');
    const watchDep = watch("file");
    useEffect(() => {
        setFileName(get(getValues('file'),'[0].name',''))
    }, [watchDep]);
    const onSubmit = (data) => {
        upload({formData:get(data,'file[0]',{}), setError});
    }
    return (
        <StyledChangeProfilePictureForm {...props} onSubmit={handleSubmit(onSubmit)}>
            <Row align={'center'} className={'mb-32'}>
                <Col xs={7}>
                    <FormUploadFile register={register}
                                    name={'file'} fileName={fileName} label={'Choose a profile picture'} validation={{required: true}}
                                    error={errors?.file} />
                </Col>
            </Row>
            <Row>
                <Col xs={5} offset={{xs:3}}>
                    <BaseButton primary type={'submit'}>Save</BaseButton>
                </Col>
            </Row>
        </StyledChangeProfilePictureForm>
    );
};

export default ChangeProfilePictureForm;
