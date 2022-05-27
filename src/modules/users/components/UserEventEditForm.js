import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Controller, useForm} from "react-hook-form";
import {Col, Container, Row} from "react-grid-system";
import moment from "moment";
import FormInput from "../../../components/form-input";
import BaseButton from "../../../components/base-button";
import FormSelect from "../../../components/form-select";
import FormTextarea from "../../../components/form-textarea/FormTextarea";
import FormUploadFile from "../../../components/form-upload-file";
import {get, isObject,isEmpty} from "lodash";
import ApiService from "../ApiService";
import Loader from "../../../components/loader";
import BaseDatePicker from "../../../components/base-datepicker";
import Flex from "../../../components/flex";
import Text from "../../../components/text";
import {toast} from "react-toastify";
import NumberFormat from "react-number-format";

const StyledUserEventEditForm = styled.form`
  padding: 30px;

  .label {
    font-size: 14px;
    font-weight: 500;
    color: #1C1C1C;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    input {
      margin-right: 10px;
    }
  }
`;
const UserEventEditForm = ({
                               langs = [],
                               event = {},
                               countries = [],
                               cancelEvent = () => {
                               },
                               editAndSaveEvent = () => {
                               },
                               ...props
                           }) => {
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(false);
    const [tillTime, setTillTime] = useState(get(event,'tillTime',''));
    const [fromTime, setFromTime] = useState(get(event,'fromTime',''));
    const [userCount, setUserCount] = useState(0);
    const {register, handleSubmit, setError, setValue, control, watch, getValues, formState: {errors}} = useForm();
    const watchDep = watch("photoId");
    const watchCountry = watch("countryId");
    const watchLanguage = watch("language");
    useEffect(() => {
        if (get(getValues('photoId'), '[0]', false) && isObject(get(getValues('photoId'), '[0]', false))) {
            uploadPhoto()
        }
    }, [watchDep]);

    useEffect(() => {
        if (getValues('language') && getValues('countryId')) {
            ApiService.GetCountryUsersCount({
                status: "ACTIVE",
                language: getValues('language'),
                countryId: getValues('countryId')
            }).then((res) => {
                if (res && res.data) {

                }
            }).catch((e) => {
                setLoading(false);
                if (e.response.data && e.response.data.errors) {
                    e.response.data.errors.map(({errorMsg}) => toast.error(`${errorMsg}`));
                    return
                }
                toast.error('ERROR')
            })
        }
    }, [watchCountry]);
    const uploadPhoto = () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('data', get(getValues('photoId'), '[0]', null));
        ApiService.UploadNotificationPhoto(formData).then((res) => {
            if (res && res.data && res.data.message) {
                setLoading(false);
                setFileName(res.data.message);
            }
        }).catch((e) => {
            setLoading(false);
        })
    }

    useEffect(() => {
        if (getValues('countryId')) {
            ApiService.GetCountryUsersCount({
                status: "ACTIVE",
                language: getValues('language'),
                countryId: getValues('countryId')
            }).then((res) => {
                if (res && res.data) {
                    setUserCount(res.data.data)
                }
            }).catch((e) => {
                setLoading(false);
                if (e.response.data && e.response.data.errors) {
                    e.response.data.errors.map(({errorMsg}) => toast.error(`${errorMsg}`));
                    return
                }
                toast.error('ERROR')
            })
        }
    }, [watchCountry, watchLanguage]);
    const onSubmit = (data) => {
        let {photoId, ...rest} = data;
        photoId = isEmpty(fileName)? get(event,'photoId') : fileName;
        data = {photoId, fromTime, tillTime, ...rest};
        editAndSaveEvent(data);

    }
    return (
        <>
            <StyledUserEventEditForm {...props} onSubmit={handleSubmit(onSubmit)}>
                <Container fluid>
                    <Row className={'mb-16'}>
                        <Col xs={12}>
                            {loading && <Loader/>}
                        </Col>
                    </Row>

                    <Row className={'mb-16'} align={'center'}>
                        <Col xs={6}>
                            <FormSelect defaultValue={get(event,'countryId',null)} options={countries}
                                        setValue={setValue} Controller={Controller} control={control}
                                        name={'countryId'} label={'Select a Country *'} placeholder={'Choose Country'}
                            />
                        </Col>
                        <Col xs={6}>
                            <Text>Total Users: <NumberFormat  displayType={'text'}
                                                             thousandSeparator={','}
                                                             value={userCount}/></Text>
                        </Col>
                    </Row>
                    <Row className={'mb-16'}>
                        <Col xs={6}>
                            <FormSelect defaultValue={get(event,'language',null)} options={langs}
                                        setValue={setValue} Controller={Controller} control={control}
                                        name={'language'} label={'Select a Language *'} placeholder={'Choose language'}
                            />
                        </Col>
                    </Row>


                    <Row className={'mb-16'}>
                        <Col xs={6}>
                            <FormInput defaultValue={get(event,'title',null)} left={4} right={8} register={register} name={'title'} label={'Title *'}
                                       placeholder={'Title'} type={'text'} validation={{required: true}}
                                       error={errors?.title}/>
                        </Col>
                    </Row>

                    <Row className={'mb-16'}>
                        <Col xs={6}>
                            <FormTextarea defaultValue={get(event,'text',null)} center={'center'} left={4} right={8} register={register} name={'text'}
                                          label={'Message *'} placeholder={'Message'} type={'text'}
                                          validation={{required: true}} error={errors?.text}/>
                        </Col>
                    </Row>
                    <Row className={'mb-24'}>
                        <Col xs={6}>
                            <FormUploadFile left={4} right={8} register={register}
                                            name={'photoId'} fileName={isEmpty(fileName) ? get(event,'photoId',null) : fileName} label={'Banner *'}
                                            error={errors?.photoId}/>
                        </Col>
                    </Row>

                    <Row className={'mb-24'} align={'center'}>
                        <Col xs={2}>
                            <Text small dark medium>Date and Time *</Text>
                        </Col>
                        <Col xs={6}>
                            <Row>
                                <Col xs={12} className={'mb-16'}>
                                    <Flex> <BaseDatePicker defaultDate={moment(get(event,'fromTime')).toDate()} dateFormat="dd/MM/yyyy h:mm aa"
                                                           handleDate={(date) => setFromTime(moment(date).format())}
                                                           showTimeSelect placeholder={'From'} width={'215px'}
                                                           className={'mr-8'}/>
                                        <BaseDatePicker defaultDate={moment(get(event,'tillTime')).toDate()} dateFormat="dd/MM/yyyy h:mm aa"
                                                        handleDate={(date) => setTillTime(moment(date).format())}
                                                        showTimeSelect placeholder={'Till'} width={'215px'}/></Flex>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className={'mb-24'}>
                        <Col xs={6}>
                            <FormInput defaultValue={get(event,'orderIndex',null)} left={4} right={8} register={register} name={'order'} label={'Banner order '}
                                       placeholder={'Order'} type={'number'}
                                       error={errors?.order}/>
                        </Col>
                    </Row>

                    <Row className={'mt-32'}>
                        <Col xs={6} className={'text-right'}>
                            <BaseButton className={'mr-16'} type={'submit'} primary>Edit and Save</BaseButton> <BaseButton handleClick={() => cancelEvent()} danger>Cancel the Event</BaseButton>
                        </Col>
                    </Row>
                </Container>
            </StyledUserEventEditForm>
        </>
    );
};

export default UserEventEditForm;
