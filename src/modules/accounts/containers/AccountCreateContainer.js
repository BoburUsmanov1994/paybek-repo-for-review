import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import BaseBreadcrumb from "../../../components/base-breadcrumb";
import Content from "../../../components/content";
import { Container, Col, Row } from "react-grid-system";
import Actions from "../Actions";
import Normalizer from "../../../services/normalizer";
import ApiService from "../ApiService";
import AccountCreateForm from "../components/AccountCreateForm";
import AccountTypeScheme from "../../../schema/AccountTypeScheme";
import CountryScheme from "../../../schema/CountryScheme";
import Loader from "../../../components/loader";

const AccountCreateContainer = ({
    history,
    getAccountTypeListDispatch,
    getCountryListDispatch,
    entities,
    roles,
    isFetchedRoles,
    countries,
    isFetchedCountries,
}) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getAccountTypeListDispatch();
        getCountryListDispatch();
    }, []);

    roles = Normalizer.Denormalize(roles, [AccountTypeScheme], entities);
    countries = Normalizer.Denormalize(countries, [CountryScheme], entities);

    const add = ({ data: params, setError }) => {
        console.log("params to post", params.countriesId[0]);
        setLoading(true);
        ApiService.CreateStaff({
            ...params,
            countriesId:
                params.countriesId[0].length === countries.length
                    ? params.countriesId[0]
                    : params.countriesId,
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
                                name: "Add",
                                url: "/accounts/create",
                            },
                        ]}
                    />
                </Col>

                <Col xs={12}>
                    <Content>
                        <AccountCreateForm
                            roles={roles}
                            countries={countries}
                            isFetchedRoles={isFetchedRoles}
                            isFetchedCountries={isFetchedCountries}
                            add={add}
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
)(withRouter(AccountCreateContainer));
