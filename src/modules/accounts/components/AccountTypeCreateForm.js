import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { get, includes, isEmpty, flatten, uniq } from "lodash";
import { Col, Container, Row } from "react-grid-system";
import FormInput from "../../../components/form-input";
import FormTextarea from "../../../components/form-textarea/FormTextarea";
import Text from "../../../components/text";
import BaseButton from "../../../components/base-button";
import ContentLoader from "../../../components/loader/ContentLoader";
import Nodata from "../../../components/nodata";
import { getPagesId } from "../../../utils";

const StyledAccountTypeCreateForm = styled.form`
    padding: 50px 50px 50px 100px;

    .label {
        font-size: 14px;
        font-weight: 500;
        color: #1c1c1c;
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        word-break: break-all;

        input {
            margin-right: 10px;
        }
    }
`;
const AccountTypeCreateForm = ({
    add = () => {},
    role = {},
    roleIsFetched = false,
    ...props
}) => {
    const {
        register,
        handleSubmit,
        setError,
        getValues,
        setValue,
        watch,
        formState: { errors },
    } = useForm();
    const watchDep = watch("departments");
    useEffect(() => {
        setValue(
            "pages",
            uniq(
                flatten([
                    getValues("pages"),
                    ...flatten(
                        get(role, "departments", [])
                            .filter((department) =>
                                includes(
                                    getValues("departments"),
                                    get(department, "name", null)
                                )
                            )
                            .map(({ pages }) => pages.map(({ name }) => name))
                    ),
                ])
            )
        );
    }, [watchDep]);

    console.log(role);

    const onSubmit = ({
        departments,
        pages: selectedPages,
        permissions,
        ...rest
    }) => {
        const pagesId = getPagesId(get(role, "departments", []), selectedPages);
        permissions = !permissions ? [] : permissions;
        const data = { ...rest, permissions, pagesId };
        add({ data, setError });
    };
    return (
        <StyledAccountTypeCreateForm
            {...props}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Container fluid>
                {roleIsFetched ? (
                    <>
                        <Row className={"mb-16"}>
                            <Col xs={7}>
                                <FormInput
                                    left={4}
                                    right={8}
                                    register={register}
                                    name={"name"}
                                    label={"Name"}
                                    placeholder={"Name"}
                                    type={"text"}
                                    validation={{ required: true }}
                                    error={errors?.name}
                                />
                            </Col>
                        </Row>
                        <Row align={"center"} className={"mb-16"}>
                            <Col xs={7}>
                                <FormTextarea
                                    center={"center"}
                                    left={4}
                                    right={8}
                                    register={register}
                                    name={"description"}
                                    label={"Description"}
                                    placeholder={"Description"}
                                    type={"text"}
                                    validation={{ required: true }}
                                    error={errors?.description}
                                />
                            </Col>
                        </Row>
                        <Row className={"mb-24"}>
                            <Col xs={3} className={"mb-16"}>
                                <Text small medium>
                                    Departments
                                </Text>
                            </Col>
                            <Col xs={9} className={"mb-16"}>
                                <Text small medium>
                                    Pages
                                </Text>
                            </Col>
                            <Col xs={12}>
                                <hr />
                            </Col>
                        </Row>
                        {!isEmpty(get(role, "departments", [])) ? (
                            get(role, "departments", []).map((department) => (
                                <Row
                                    key={get(department, "id", null)}
                                    className={"mb-16"}
                                >
                                    <Col xs={3}>
                                        <label className={"label"}>
                                            <input
                                                type="checkbox"
                                                value={get(
                                                    department,
                                                    "name",
                                                    null
                                                )}
                                                {...register("departments")}
                                            />{" "}
                                            {get(department, "title", "")}
                                        </label>
                                    </Col>
                                    <Col xs={9}>
                                        <Row>
                                            {get(department, "pages", []).map(
                                                (page) => (
                                                    <Col
                                                        key={get(
                                                            page,
                                                            "id",
                                                            null
                                                        )}
                                                        xs={4}
                                                    >
                                                        <label
                                                            className={"label"}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                value={get(
                                                                    page,
                                                                    "name",
                                                                    null
                                                                )}
                                                                {...register(
                                                                    "pages"
                                                                )}
                                                            />
                                                            {get(
                                                                page,
                                                                "title",
                                                                ""
                                                            )}
                                                        </label>
                                                    </Col>
                                                )
                                            )}
                                        </Row>
                                    </Col>
                                </Row>
                            ))
                        ) : (
                            <Nodata />
                        )}

                        <Row className={"mb-24 mt-32"}>
                            <Col xs={12} className={"mb-16"}>
                                <Text small medium>
                                    Permissions
                                </Text>
                            </Col>
                            <Col xs={12}>
                                <hr />
                            </Col>
                        </Row>
                        <Row>
                            {!isEmpty(get(role, "permissionList", [])) ? (
                                get(role, "permissionList", []).map(
                                    (permission) => (
                                        <Col
                                            key={get(permission, "name", null)}
                                            xs={3}
                                        >
                                            <label className={"label"}>
                                                <input
                                                    type="checkbox"
                                                    value={get(
                                                        permission,
                                                        "name",
                                                        null
                                                    )}
                                                    {...register("permissions")}
                                                />
                                                {get(permission, "title", "")}
                                            </label>
                                        </Col>
                                    )
                                )
                            ) : (
                                <Nodata />
                            )}
                        </Row>
                        <Row className={"mt-32"}>
                            <Col xs={12} className={"text-right"}>
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
        </StyledAccountTypeCreateForm>
    );
};

export default AccountTypeCreateForm;
