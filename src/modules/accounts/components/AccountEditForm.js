import React from "react";
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import { Col, Container, Row } from "react-grid-system";
import { get, includes, isEmpty } from "lodash";
import FormInput from "../../../components/form-input";
import BaseButton from "../../../components/base-button";
import FormSelect from "../../../components/form-select";
import ContentLoader from "../../../components/loader/ContentLoader";

const StyledAccountEditForm = styled.form`
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
const AccountEditForm = ({
    edit = () => {},
    roles = [],
    countries = [],
    isFetchedRoles = false,
    isFetchedCountries = false,
    staff,
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

    countries = [{ value: 1, label: "Select All" }, ...countries];

    const onSubmit = (data) => {
        edit({ data, setError });
    };
    return (
        <>
            <StyledAccountEditForm {...props} onSubmit={handleSubmit(onSubmit)}>
                <Container fluid>
                    {isFetchedRoles && isFetchedCountries ? (
                        <>
                            <Row className={"mb-16"}>
                                <Col xs={6}>
                                    <FormInput
                                        defaultValue={get(
                                            staff,
                                            "firstName",
                                            null
                                        )}
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
                                        defaultValue={get(
                                            staff,
                                            "lastName",
                                            null
                                        )}
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
                                        defaultValue={get(staff, "email", null)}
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
                                        defaultValue={get(
                                            staff,
                                            "roleId",
                                            null
                                        )}
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
                                        defaultValue={
                                            get(staff, "countriesId", [])
                                                .length === 179
                                                ? {
                                                      value: 1,
                                                      label: "Select All",
                                                  }
                                                : countries.filter(
                                                      ({ value }) =>
                                                          includes(
                                                              get(
                                                                  staff,
                                                                  "countriesId",
                                                                  null
                                                              ),
                                                              value
                                                          )
                                                  )
                                        }
                                        options={[...countries]}
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
                                        defaultValue={get(
                                            staff,
                                            "enabled",
                                            false
                                        )}
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
                                        Save
                                    </BaseButton>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <ContentLoader />
                    )}
                </Container>
            </StyledAccountEditForm>
        </>
    );
};

export default AccountEditForm;
