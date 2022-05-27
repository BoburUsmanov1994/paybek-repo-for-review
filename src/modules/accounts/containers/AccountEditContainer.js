import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { get, isObject } from "lodash";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import BaseBreadcrumb from "../../../components/base-breadcrumb";
import Content from "../../../components/content";
import { Col, Container, Row } from "react-grid-system";
import Actions from "../Actions";
import Normalizer from "../../../services/normalizer";
import ApiService from "../ApiService";
import AccountTypeScheme from "../../../schema/AccountTypeScheme";
import CountryScheme from "../../../schema/CountryScheme";
import Loader from "../../../components/loader";
import AccountEditForm from "../components/AccountEditForm";
import ContentLoader from "../../../components/loader/ContentLoader";
import StaffScheme from "../../../schema/StaffScheme";

const AccountEditContainer = ({
    history,
    staffId,
    getAccountTypeListDispatch,
    getCountryListDispatch,
    getOneStaffDispatch,
    entities,
    roles,
    isFetchedRoles,
    countries,
    isFetchedCountries,
    staff,
    isFetchedStaff,
}) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getOneStaffDispatch(staffId);
        getAccountTypeListDispatch();
        getCountryListDispatch();
    }, []);

    roles = Normalizer.Denormalize(roles, [AccountTypeScheme], entities);
    countries = Normalizer.Denormalize(countries, [CountryScheme], entities);
    staff = Normalizer.Denormalize(staff, StaffScheme, entities);

    const allCountries =
        countries.map(({ id, name }) => ({ value: id, label: name })) || [];

    const edit = ({ data: params, setError }) => {
        console.log("params countriesId", params.countriesId);
        setLoading(true);

        const countryIdList =
            (params.countriesId && params.countriesId[0] === 1) ||
            params.countriesId.value === 1
                ? allCountries.map(({ value }) => value)
                : Array.isArray(get(params, "countriesId"))
                ? get(params, "countriesId").map((country) =>
                      isObject(country) ? get(country, "value", null) : country
                  )
                : get(params, "countriesId").value === 1
                ? allCountries.allCountries.map(({ value }) => value)
                : [];

        ApiService.UpdateStaff({
            ...params,
            id: staffId,
            countriesId: countryIdList,
        })
            .then((res) => {
                if (res && res.data) {
                    setLoading(false);
                    toast.success("SUCCESS");
                    history.push("/accounts");
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
        <Container fluid>
            {loading && <Loader />}
            <Row>
                <Col xs={12}>
                    <BaseBreadcrumb
                        items={[
                            { id: 1, name: "Account", url: "/accounts" },
                            {
                                id: 2,
                                name: "Accounts",
                                url: "/accounts",
                            },
                            {
                                id: 3,
                                name: "Edit",
                                url: "/accounts/update/" + staffId,
                            },
                        ]}
                    />
                </Col>

                <Col xs={12}>
                    {isFetchedStaff ? (
                        <Content>
                            <AccountEditForm
                                roles={roles}
                                countries={countries}
                                isFetchedRoles={isFetchedRoles}
                                isFetchedCountries={isFetchedCountries}
                                edit={edit}
                                staff={staff}
                            />
                        </Content>
                    ) : (
                        <ContentLoader />
                    )}
                </Col>
            </Row>
        </Container>
    );
};
const mapStateToProps = (state) => {
    return {
        entities: get(state, "normalizer.entities", {}),
        staff: get(state, "normalizer.data.get-one-staff.result", null),
        isFetchedStaff: get(
            state,
            "normalizer.data.get-one-staff.isFetched",
            false
        ),
        roles: get(
            state,
            "normalizer.data.account-types-list.result.content",
            []
        ),
        isFetchedRoles: get(
            state,
            "normalizer.data.account-types-list.isFetched",
            false
        ),
        countries: get(state, "normalizer.data.country-list.result", []),
        isFetchedCountries: get(
            state,
            "normalizer.data.country-list.isFetched",
            false
        ),
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getOneStaffDispatch: (staffId) =>
            dispatch({
                type: Actions.GET_ONE_STAFF.REQUEST,
                payload: { staffId },
            }),
        getAccountTypeListDispatch: () =>
            dispatch({
                type: Actions.GET_ACCOUNT_TYPE_LIST.REQUEST,
                payload: { params: {} },
            }),
        getCountryListDispatch: () =>
            dispatch({
                type: Actions.GET_COUNTRY_LIST.REQUEST,
                payload: { params: {} },
            }),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AccountEditContainer));
