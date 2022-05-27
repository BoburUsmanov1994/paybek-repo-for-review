import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { get } from "lodash";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import BaseBreadcrumb from "../../../components/base-breadcrumb";
import Content from "../../../components/content";
import { Col, Container, Row } from "react-grid-system";
import Actions from "../Actions";
import Normalizer from "../../../services/normalizer";
import DepartmentScheme from "../../../schema/DepartmentScheme";
import PermissionScheme from "../../../schema/PermissionScheme";
import ApiService from "../ApiService";
import Loader from "../../../components/loader";
import AccountTypeEditForm from "../components/AccountTypeEditForm";

const AccountTypeEditContainer = ({
    history,
    roleId,
    getPagesAndPermissionsDispatch,
    getAllPagesAndPermissionsDispatch,
    entities,
    role,
    roleIsFetched,
    allPages,
}) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getPagesAndPermissionsDispatch(roleId);
        getAllPagesAndPermissionsDispatch();
    }, []);

    // useEffect(() => {
    //     getAllPagesAndPermissionsDispatch();
    // }, []);

    role = Normalizer.Denormalize(
        role,
        {
            departments: [DepartmentScheme],
            permissionList: [PermissionScheme],
        },
        entities
    );

    const select = useSelector((state) => state.accounts);

    console.log("all pages", select);
    console.log("all pages", allPages);

    const update = ({ data: params, setError }) => {
        setLoading(true);
        ApiService.EditAccountType({ ...params, id: roleId })
            .then((res) => {
                if (res && res.data) {
                    setLoading(false);
                    toast.success("SUCCESS");
                    history.push("/accounts/types");
                }
            })
            .catch((e) => {
                setLoading(false);
                if (e.response.data && e.response.data.errors) {
                    e.response.data.errors.map(({ errorMsg }) =>
                        toast.error(`${errorMsg}`)
                    );
                    return;
                }
                toast.error("ERROR");
            });
    };
    return (
        <Container fluid className={"mb-16"}>
            {loading && <Loader />}
            <Row>
                <Col xs={12}>
                    <BaseBreadcrumb
                        items={[
                            { id: 1, name: "Account", url: "/accounts" },
                            {
                                id: 2,
                                name: "Account Types",
                                url: "/accounts/types",
                            },
                            {
                                id: 3,
                                name: "Edit",
                                url: "/accounts/types/update",
                            },
                        ]}
                    />
                </Col>
                <Col xs={12}>
                    <Content>
                        <AccountTypeEditForm
                            role={role}
                            roleIsFetched={roleIsFetched}
                            update={update}
                            allPages={allPages?.data}
                        />
                    </Content>
                </Col>
            </Row>
        </Container>
    );
};
const mapStateToProps = (state) => {
    return {
        entities: get(state, "normalizer.entities", {}),
        role: get(state, "normalizer.data.get-role.result", {}),
        roleIsFetched: get(state, "normalizer.data.get-role.isFetched", false),
        allPages: get(state, "accounts.allPagesAndDepartments"),
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getPagesAndPermissionsDispatch: (roleId) =>
            dispatch({
                type: Actions.GET_PAGES_AND_PERMISSIONS.REQUEST,
                payload: { id: roleId },
            }),
        getAllPagesAndPermissionsDispatch: () =>
            dispatch({
                type: Actions.GET_ALL_PAGES_AND_PERMISSIONS.REQUEST,
                payload: { id: null },
            }),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AccountTypeEditContainer));
