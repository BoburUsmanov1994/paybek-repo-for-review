import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Controller, useForm} from "react-hook-form";
import {Col, Container, Row} from "react-grid-system";
import moment from "moment";
import {useHistory} from "react-router-dom";
import FormInput from "../../../components/form-input";
import BaseButton from "../../../components/base-button";
import FormSelect from "../../../components/form-select";
import FormTextarea from "../../../components/form-textarea/FormTextarea";
import FormUploadFile from "../../../components/form-upload-file";
import {get, isNil, isObject} from "lodash";
import ApiService from "../ApiService";
import Loader from "../../../components/loader";
import BaseDatePicker from "../../../components/base-datepicker";
import Flex from "../../../components/flex";
import classNames from "classnames";
import Text from "../../../components/text";
import {toast} from "react-toastify";
import NumberFormat from "react-number-format";

const StyledUserNotificationCreateForm = styled.form`
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
const UserNotificationCreateForm = ({
                                        langs = [],
                                        countries = [],
                                        ...props
                                    }) => {
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(null);
    const [id, setId] = useState(null);
    const [userCount, setUserCount] = useState(0);
    const history = useHistory();
    const {register, handleSubmit, setError, setValue, control, watch, getValues, formState: {errors}} = useForm();
    const watchDep = watch("photoId");
    const watchCountry = watch("countryId");
    const watchLanguage = watch("language");
    const watchStatus = watch("userStatus");
    useEffect(() => {
        if (get(getValues('photoId'), '[0]', false) && isObject(get(getValues('photoId'), '[0]', false))) {
            uploadPhoto()
        }
    }, [watchDep]);

    useEffect(() => {
        if ( getValues('countryId')) {
            ApiService.GetCountryUsersCount({
                status: getValues('userStatus') ,
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
    }, [watchCountry,watchLanguage,watchStatus]);
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
    const sendNotification = () => {
        setLoading(true);
        ApiService.SendPushNotification(id).then((res) => {
            if(res && res.data){
                setLoading(false);
                toast.success('Success');
                history.push('/users')
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
    const onSubmit = (data) => {
        let {photoId,language,...rest} = data;
        photoId = fileName;
        setLoading(true);
        ApiService.SendTestPushNotification({photoId,language,...rest}).then((res) => {
            if(res && res.data){
                setLoading(false);
                toast.success(res.data.message);
                setId(res.data.data.id);
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
    return (
        <>
            <StyledUserNotificationCreateForm {...props} onSubmit={handleSubmit(onSubmit)}>
                <Container fluid>
                    <Row className={'mb-16'}>
                        <Col xs={12}>
                            {loading && <Loader/>}
                        </Col>
                        <Col xs={6}>
                            <FormSelect
                                rule={{required:true}}
                                options={[{value: 'INACTIVE', label: 'INACTIVE'}, {value: 'ACTIVE', label: 'ACTIVE'}]}
                                setValue={setValue} Controller={Controller} control={control} name={'userStatus'}
                                error={errors?.userStatus}
                                label={'User type'} placeholder={'Select Status'}/>
                        </Col>
                    </Row>

                    <Row className={'mb-16'} align={'center'}>
                        <Col xs={6}>
                            <FormSelect options={countries}
                                        setValue={setValue} Controller={Controller} control={control}
                                        name={'countryId'} label={'Select a Country'} placeholder={'Choose Country'}
                            />
                        </Col>
                        <Col xs={6}>
                            <Text>Total Users: <NumberFormat displayType={'text'}
                                                             thousandSeparator={','}
                                                             value={userCount}/></Text>
                        </Col>
                    </Row>
                    <Row className={'mb-16'}>
                        <Col xs={6}>
                            <FormSelect options={langs}
                                        setValue={setValue} Controller={Controller} control={control}
                                        name={'language'} label={'Select a Language'} placeholder={'Choose language'}
                            />
                        </Col>
                    </Row>


                    <Row className={'mb-16'}>
                        <Col xs={6}>
                            <FormInput left={4} right={8} register={register} name={'title'} label={'Title'}
                                       placeholder={'Title'} type={'text'} validation={{required: true}}
                                       error={errors?.title}/>
                        </Col>
                    </Row>

                    <Row className={'mb-16'}>
                        <Col xs={6}>
                            <FormTextarea center={'center'} left={4} right={8} register={register} name={'text'}
                                          label={'Message'} placeholder={'Message'} type={'text'}
                                          validation={{required: true}} error={errors?.text}/>
                        </Col>
                    </Row>
                    <Row className={'mb-24'}>
                        <Col xs={6}>
                            <FormUploadFile left={4} right={8} register={register}
                                            name={'photoId'} fileName={fileName} label={'Thumbnail'} validation={{required: true}}
                                            error={errors?.photoId} />
                        </Col>
                    </Row>

                    <Row className={'mb-24'}>
                        <Col xs={6} offset={{xs:2}}>
                            <Row>
                                <Col xs={12} className={'mb-16'}>
                                   <Flex> <input className={classNames({error:errors.sentDate})} {...register('sentDate',{required: true})} type="radio"  value={date} /> <BaseDatePicker dateFormat="dd/MM/yyyy h:mm aa" handleDate={(date) => setDate(moment(date).format())} showTimeSelect placeholder={'Choose a date and time'} width={'300px'} className={'ml-16'} /></Flex>
                                </Col>
                                <Col xs={12}>
                                   <Flex> <input className={classNames({error:errors.sentDate})}  type="radio" {...register('sentDate',{required: true})}  value={moment()}/><Text className = {"ml-16"}>Send immediately</Text> </Flex>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row className={'mb-16'}>
                        <Col xs={7}>
                            <Row align={'center'}>
                                <Col xs={4}>
                                    <Text>
                                        Test
                                    </Text>
                                </Col>
                                <Col xs={4}>
                                    <input type="text" {...register('testPhoneNumber')} className={'base-input'}/>
                                </Col>
                                <Col xs={4}>
                                    <BaseButton default type={'submit'}>Send a test</BaseButton>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row className={'mt-32'}>
                        <Col xs={6} className={'text-right'}>
                            <BaseButton handleClick={() => sendNotification()} disabled={isNil(id)} primary >Send</BaseButton>
                        </Col>
                    </Row>
                </Container>
            </StyledUserNotificationCreateForm>
        </>
    );
};

export default UserNotificationCreateForm;
