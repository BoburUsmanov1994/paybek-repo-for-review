import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { flatten, get, includes, isEmpty, uniq } from "lodash";
import { Col, Container, Row } from "react-grid-system";
import FormInput from "../../../components/form-input";
import FormTextarea from "../../../components/form-textarea/FormTextarea";
import Text from "../../../components/text";
import BaseButton from "../../../components/base-button";
import ContentLoader from "../../../components/loader/ContentLoader";
import Nodata from "../../../components/nodata";
import { getPagesId } from "../../../utils";
import { all } from "redux-saga/effects";

const StyledAccountTypeEditForm = styled.form`
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
const AccountTypeEditForm = ({
    update = () => {},
    role = {},
    roleIsFetched = false,
    allPages,
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
    //showing all gapes and deparmanents
    allPages = allPages ? allPages?.departments : [];
    // console.log("all pages edit page", allPages);
    const roleDepartments = get(role, "departments", []);
    // all deparment should show
    const newRole = {
        ...role,
        departments: allPages.map(({ id, name, pages, title }) => {
            let container = {
                id,
                name,
                pages,
                title,
            };
            roleDepartments.forEach((item) =>
                item.id === id
                    ? (container = { ...container, pages: item.pages })
                    : container
            );
            return container;
        }),
    };
    role = newRole;
    // console.log("role", role);
    // console.log("newRole", newRole);
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

    const permissPages = [];

    useEffect(() => {
        setValue(
            "permissions",
            get(role, "permissionList", [])
                .filter(({ checked }) => checked)
                .map(({ name }) => name)
        );
        setValue(
            "pages",
            flatten(
                get(role, "departments", []).map((department) => [
                    ...get(department, "pages", []).filter(
                        ({ checked }) => checked
                    ),
                ])
            ).map(({ name }) => name)
        );
    }, [role]);

    const onSubmit = ({ departments, pages: selectedPages, ...rest }) => {
        const pagesId = getPagesId(get(role, "departments", []), selectedPages);
        const data = { ...rest, pagesId };
        update({ data, setError });
    };
    return (
        <StyledAccountTypeEditForm {...props} onSubmit={handleSubmit(onSubmit)}>
            <Container fluid>
                {roleIsFetched ? (
                    <>
                        <Row className={"mb-16"}>
                            <Col xs={7}>
                                <FormInput
                                    defaultValue={get(role, "name", null)}
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
                                    defaultValue={get(
                                        role,
                                        "description",
                                        null
                                    )}
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
                                    Save
                                </BaseButton>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <ContentLoader />
                )}
            </Container>
        </StyledAccountTypeEditForm>
    );
};

export default AccountTypeEditForm;
