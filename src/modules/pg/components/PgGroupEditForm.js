import React from 'react';
import styled from "styled-components";
import {Controller, useForm} from "react-hook-form";
import {get, includes, isEmpty,orderBy} from "lodash";
import {Col, Row} from "react-grid-system";
import BaseButton from "../../../components/base-button";
import FormInput from "../../../components/form-input";
import FormSelect from "../../../components/form-select/FormSelect";

const StyledPgGroupEditForm = styled.form`


`;

const PgGroupEditForm = ({
                             createOrEdit = () => {
                             },  countries = [], ...props
                         }) => {
    const {register, handleSubmit, formState: {errors}, control, setValue} = useForm();
    const onSubmit = (data) => {
        console.log(data)
        createOrEdit(data);
    }

    countries = orderBy(countries.map(({CountryIso, CountryName}) => ({value: CountryIso, label: CountryName})) || [],['label'],['DESC']);
    const countriesIsos = countries.map(item => item.value);
    
    return (
        <StyledPgGroupEditForm {...props} onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col xs={5}>
                    <Row className={'mb-8'}>
                        <Col xs={12}>
                            <FormSelect 
                                rule={{required: true}} 
                                left={4} 
                                right={8} 
                                defaultValue={1} 
                                options={[{value: 1, label: 'Stripe'}]}
                                setValue={setValue} 
                                Controller={Controller} 
                                control={control} 
                                error={errors?.stripe} 
                                name={'stripe'}
                                label={'PG'} placeholder={'Select PG'}/>
                        </Col>
                    </Row>
                    <Row className={'mb-8'}>
                        <Col xs={12}>
                            <FormSelect
                                options={[{value: countriesIsos, label: "Select All"}, ...countries]}
                                setValue={setValue} 
                                Controller={Controller} 
                                control={control}
                                name={'countryIsos'} 
                                label={'Country'} 
                                placeholder={'Choose Countries'}  
                                isMulti
                                />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <FormInput  
                                register={register}
                                name={'paybekMargin'} 
                                label={'Paybek Margin'} 
                                placeholder={'Paybek Margin'}
                                validation={{required: true}} 
                                error={errors?.paybekMargin} 
                                measure={'%'}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <FormInput measure={'%'}    register={register} name={'volumeFee'}
                                       label={'Volume Fee'} placeholder={'Volume Fee'} validation={{required: true}}
                                       error={errors?.volumeFee}/>
                        </Col>
                    </Row>
                    <Row >
                        <Col xs={12}>
                            <FormInput    
                            register={register} name={'txnFee'}
                                       label={'Txn Fee'} placeholder={'Txn Fee'} validation={{required: true}}
                                       error={errors?.txnFee}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <FormInput  
                                register={register}
                                name={'intCardFee'}
                                label={'Int. card fee'}
                                placeholder={'Int. card fee'}
                                validation={{required: true}} 
                                error={errors?.paybekMargin} 
                                measure={'%'}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <FormInput 
                                register={register} 
                                name={'exchangeFee'}
                                label={'Exchange Fee'} 
                                placeholder={'Exchange Fee'} 
                                validation={{required: true}}
                                error={errors?.volumeFee} 
                                measure={'%'}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <FormInput 
                                register={register} 
                                name={'radarFee'}
                                label={'Radar Fee'} 
                                placeholder={'Radar Fee'} 
                                validation={{required: true}}
                                error={errors?.txnFee} />
                        </Col>
                    </Row>

                    <Row className={'mb-32'}>
                        <Col xs={12}>
                            <FormSelect
                                // rule={{required: true}}
                                // error={errors?.active}
                                defaultValue={'INACTIVE'}
                                options={[{value: 'INACTIVE', label: 'OFF'}, {value: 'ACTIVE', label: 'ON'}]}
                                setValue={setValue} Controller={Controller} control={control} name={'active'}
                                label={'Status'} placeholder={'Select Status'}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8} offset={{xs: 4}}>
                            <BaseButton disabled={!isEmpty(errors)} type={'submit'} primary medium>Save</BaseButton>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </StyledPgGroupEditForm>
    );
};

export default PgGroupEditForm;
