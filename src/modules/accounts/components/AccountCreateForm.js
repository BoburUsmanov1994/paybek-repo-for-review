import React from "react";
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import { Col, Container, Row } from "react-grid-system";
import FormInput from "../../../components/form-input";
import BaseButton from "../../../components/base-button";
import FormSelect from "../../../components/form-select";
import ContentLoader from "../../../components/loader/ContentLoader";

const StyledAccountCreateForm = styled.form`
    padding: 50px 50px 50px 100px;

    .label {
        font-size: 14px;
        font-weight: 500;
        color: #1c1c1c;
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        input {
            margin-right: 10px;
        }
    }
`;
const AccountCreateForm = ({
    add = () => {},
    roles = [],
    countries = [],
    isFetchedRoles = false,
    isFetchedCountries = false,
    ...props
}) => {
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        control,
        formState: { errors },
    } = useForm();
    roles = roles.map(({ id, name }) => ({ value: id, label: name })) || [];
    countries =
        countries.map(({ id, name }) => ({ value: id, label: name })) || [];
    const allCountries = countries.map(({ value }) => value);
    const onSubmit = (data) => {
        add({ data, setError });
    };
    return (
        <>
            <StyledAccountCreateForm
                {...props}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Container fluid>
                    {isFetchedRoles && isFetchedCountries ? (
                        <>
                            <Row className={"mb-16"}>
                                <Col xs={6}>
                                    <FormInput
                                        left={4}
                                        right={8}
                                        register={register}
                                        name={"firstName"}
                                        label={"First Name"}
                                        placeholder={"First Name"}
                                        type={"text"}
                                        validation={{ required: true }}
                                        error={errors?.firstName}
                                    />
                                </Col>
                            </Row>

                            <Row className={"mb-16"}>
                                <Col xs={6}>
                                    <FormInput
                                        left={4}
                                        right={8}
                                        register={register}
                                        name={"lastName"}
                                        label={"Last Name"}
                                        placeholder={"Last Name"}
                                        type={"text"}
                                        validation={{ required: true }}
                                        error={errors?.lastName}
                                    />
                                </Col>
                            </Row>

                            <Row className={"mb-16"}>
                                <Col xs={6}>
                                    <FormInput
                                        left={4}
                                        right={8}
                                        register={register}
                                        name={"email"}
                                        label={"Email"}
                                        placeholder={"Email"}
                                        type={"text"}
                                        validation={{
                                            required: true,
                                            pattern:
                                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        }}
                                        error={errors?.email}
                                    />
                                </Col>
                            </Row>

                            <Row className={"mb-16"}>
                                <Col xs={6}>
                                    <FormSelect
                                        options={roles}
                                        setValue={setValue}
                                        Controller={Controller}
                                        control={control}
                                        name={"roleId"}
                                        label={"Account Type"}
                                        placeholder={"Choose Account Type"}
                                    />
                                </Col>
                            </Row>

                            <Row className={"mb-16"}>
                                <Col xs={6}>
                                    <FormSelect
                                        options={[
                                            {
                                                value: allCountries,
                                                label: "Select All",
                                            },
                                            ...countries,
                                        ]}
                                        setValue={setValue}
                                        Controller={Controller}
                                        control={control}
                                        name={"countriesId"}
                                        label={"Country"}
                                        placeholder={"Choose Countries"}
                                        isMulti
                                    />
                                </Col>
                            </Row>

                            <Row className={"mb-16"}>
                                <Col xs={6}>
                                    <FormSelect
                                        options={[
                                            { value: false, label: "INACTIVE" },
                                            { value: true, label: "ACTIVE" },
                                        ]}
                                        setValue={setValue}
                                        Controller={Controller}
                                        control={control}
                                        name={"status"}
                                        error={errors?.status}
                                        label={"Status"}
                                        placeholder={"Select Status"}
                                    />
                                </Col>
                            </Row>

                            <Row className={"mt-32"}>
                                <Col xs={6} className={"text-right"}>
                                    <BaseButton primary type={"submit"}>
                                        Add
                                    </BaseButton>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <ContentLoader />
                    )}
                </Container>
            </StyledAccountCreateForm>
        </>
    );
};

export default AccountCreateForm;
