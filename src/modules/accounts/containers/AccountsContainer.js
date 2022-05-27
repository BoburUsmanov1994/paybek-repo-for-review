import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { get, isEmpty } from "lodash";
import { withRouter } from "react-router-dom";
import { Col, Container, Row } from "react-grid-system";
import moment from "moment";
import BaseBreadcrumb from "../../../components/base-breadcrumb";
import Content from "../../../components/content";
import BaseTable from "../../../components/base-table";
import BaseSelect from "../../../components/base-select";
import BaseInput from "../../../components/base-input";
import BaseButton from "../../../components/base-button";
import Actions from "../Actions";
import TXNSActions from "../../txns/Actions";
import Normalizer from "../../../services/normalizer";
import StaffScheme from "../../../schema/StaffScheme";
import ContentLoader from "../../../components/loader/ContentLoader";
import Flex from "../../../components/flex";
import AccountTypeScheme from "../../../schema/AccountTypeScheme";
import CountryScheme from "../../../schema/CountryScheme";
import BasePagination from "../../../components/base-pagination";
import HasAccess from "../../../services/auth/HasAccess";
import { Edit, Trash } from "react-feather";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import Text from "../../../components/text";

const AccountsContainer = ({
    history,
    getStaffListDispatch,
    entities,
    staff,
    isFetched,
    roles,
    countries,
    getCountryListDispatch,
    getAccountTypeListDispatch,
    totalPages,
    pageSize,
    pageNumber,
}) => {
    const lastSearchedItem = JSON.parse(
        sessionStorage.getItem("lastSearchedItem")
    );
    const [filter, setFilter] = useState({
        countryId: "",
        searchingField: lastSearchedItem || "",
        size: pageSize,
        page: 0,
        roleId: "",
    });

    const [clear, setClear] = useState("");
    useEffect(() => {
        getStaffListDispatch({ ...filter });
        getCountryListDispatch();
        getAccountTypeListDispatch();
    }, []);

    useEffect(() => {
        getStaffListDispatch({ ...filter });
    }, [filter]);

    const refCountrySelect = useRef();
    const refAccountSelect = useRef();

    staff = Normalizer.Denormalize(staff, [StaffScheme], entities);
    roles = Normalizer.Denormalize(roles, [AccountTypeScheme], entities).map(
        ({ id, name }) => ({
            value: id,
            label: name,
        })
    );
    countries = Normalizer.Denormalize(
        countries,
        [CountryScheme],
        entities
    ).map(({ id, name }) => ({
        value: id,
        label: name,
    }));

    const deleteAccount = (id) => {
        confirmAlert({
            title: "Confirm to delete",
            message: "Are you sure to do this.",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => toast.error("Error"),
                },
                {
                    label: "No",
                },
            ],
        });
    };

    const editAccount = (id) => {};

    const clearCountrySelect = () => {
        refCountrySelect.current.select.clearValue();
    };

    const clearAccountSelect = () => {
        refAccountSelect.current.select.clearValue();
    };

    const clearSelect = () => {
        clearCountrySelect();
        clearAccountSelect();
        setClear("");
        sessionStorage.clear();
        setFilter((filter) => ({ ...filter, searchingField: "" }));
    };

    return (
        <Container fluid>
            <Row>
                <Col xs={12} className={"mb-8"}>
                    <BaseBreadcrumb
                        items={[
                            { id: 1, name: "Account", url: "/accounts" },
                            {
                                id: 2,
                                name: "Accounts",
                                url: "/accounts",
                            },
                        ]}
                    />
                </Col>
                <Col xs={12}>
                    <Content>
                        <Row align={"center"} className={"mb-16"}>
                            <Col xs={8}>
                                <Flex>
                                    <BaseSelect
                                        ref={refCountrySelect}
                                        handleChange={(values) =>
                                            setFilter((filter) => ({
                                                ...filter,
                                                countryId: get(
                                                    values,
                                                    "value",
                                                    ""
                                                ),
                                            }))
                                        }
                                        options={countries}
                                        placeholder={"Filter by country"}
                                        width={"200px"}
                                        isSearchable={true}
                                    />
                                    <BaseSelect
                                        ref={refAccountSelect}
                                        handleChange={(values) =>
                                            setFilter((filter) => ({
                                                ...filter,
                                                roleId: get(
                                                    values,
                                                    "value",
                                                    ""
                                                ),
                                            }))
                                        }
                                        options={roles}
                                        placeholder={"Filter by account type"}
                                        margin={"0 0 0 15px"}
                                    />
                                    <BaseInput
                                        value={lastSearchedItem || clear}
                                        handleInput={(val) => {
                                            setClear(val);
                                            setFilter((filter) => ({
                                                ...filter,
                                                searchingField: val,
                                            }));
                                            sessionStorage.setItem(
                                                "lastSearchedItem",
                                                JSON.stringify(val)
                                            );
                                        }}
                                        placeholder={
                                            "Search by name/email/id ..."
                                        }
                                        margin={"0 0 0 15px"}
                                    />
                                </Flex>
                            </Col>
                            <Col xs={4} className={"text-right"}>
                                <BaseButton
                                    handleClick={() => {
                                        setFilter((filter) => ({
                                            ...filter,
                                            roleId: "",
                                            countryId: "",
                                        }));
                                        clearSelect();
                                    }}
                                    danger
                                    className={"mr-4"}
                                >
                                    Reset
                                </BaseButton>
                                <HasAccess>
                                    {({ userCan, permissions }) =>
                                        userCan(permissions, "ADD_STAFF") && (
                                            <BaseButton
                                                primary
                                                handleClick={() =>
                                                    history.push(
                                                        "/accounts/create"
                                                    )
                                                }
                                            >
                                                Add
                                            </BaseButton>
                                        )
                                    }
                                </HasAccess>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} className={"mb-32"}>
                                {isFetched ? (
                                    <BaseTable
                                        tableHeader={[
                                            "ID",
                                            "First Name",
                                            "Last Name",
                                            "Email",
                                            "Account Type",
                                            "Country",
                                            "Added time",
                                            "",
                                            "Status",
                                            "Action",
                                        ]}
                                    >
                                        {!isEmpty(staff) ? (
                                            staff.map((item, index) => (
                                                <tr key={get(item, "id", null)}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        {get(
                                                            item,
                                                            "firstName",
                                                            "-"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {get(
                                                            item,
                                                            "lastName",
                                                            "-"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {get(
                                                            item,
                                                            "email",
                                                            "-"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {get(
                                                            item,
                                                            "roleName",
                                                            "-"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {get(
                                                            item,
                                                            "countries",
                                                            ""
                                                        ).length ===
                                                        countries.length
                                                            ? "Select All"
                                                            : get(
                                                                  item,
                                                                  "countries",
                                                                  ""
                                                              ).join(",")}
                                                    </td>
                                                    <td>
                                                        {moment(
                                                            get(
                                                                item,
                                                                "signUpDate"
                                                            )
                                                        ).format(
                                                            "DD.MM.YYYY hh:mm A"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {moment(
                                                            get(
                                                                item,
                                                                "lastActive"
                                                            )
                                                        ).format(
                                                            "DD.MM.YYYY  hh:mm A"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {get(
                                                            item,
                                                            "enabled",
                                                            false
                                                        ) ? (
                                                            <Text
                                                                success
                                                                medium
                                                            >
                                                                Active
                                                            </Text>
                                                        ) : (
                                                            <Text danger medium>
                                                                Inactive
                                                            </Text>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <HasAccess>
                                                            {({
                                                                userCan,
                                                                permissions,
                                                            }) => (
                                                                <>
                                                                    {userCan(
                                                                        permissions,
                                                                        "EDIT_ROLE"
                                                                    ) && (
                                                                        <Edit
                                                                            onClick={() =>
                                                                                history.push(
                                                                                    "/accounts/update/" +
                                                                                        get(
                                                                                            item,
                                                                                            "id",
                                                                                            null
                                                                                        )
                                                                                )
                                                                            }
                                                                            className={
                                                                                "cursor-pointer mr-4"
                                                                            }
                                                                            color="#53AC92"
                                                                            size={
                                                                                20
                                                                            }
                                                                        />
                                                                    )}
                                                                    <Trash
                                                                        onClick={() =>
                                                                            deleteAccount(
                                                                                get(
                                                                                    item,
                                                                                    "id",
                                                                                    null
                                                                                )
                                                                            )
                                                                        }
                                                                        className={
                                                                            "cursor-pointer ml-4 d-none"
                                                                        }
                                                                        color="#EC536A"
                                                                        size={
                                                                            20
                                                                        }
                                                                    />
                                                                </>
                                                            )}
                                                        </HasAccess>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={10}>No data</td>
                                            </tr>
                                        )}
                                    </BaseTable>
                                ) : (
                                    <ContentLoader />
                                )}
                            </Col>
                        </Row>
                        {totalPages > 0 && (
                            <Row align={"center"}>
                                <Col xs={4}>
                                    <Flex>
                                        <Text>Show</Text>
                                        <BaseSelect
                                            disabled
                                            handleChange={({ value }) =>
                                                setFilter((filter) => ({
                                                    ...filter,
                                                    size: value,
                                                }))
                                            }
                                            defaultValue={pageSize}
                                            options={[
                                                { value: 5, label: 5 },
                                                { value: 10, label: 10 },
                                                {
                                                    value: 25,
                                                    label: 25,
                                                },
                                                { value: 50, label: 50 },
                                            ]}
                                            margin={"0 12px 0 12px"}
                                            width={"80px"}
                                            placeholder={"Count"}
                                        />
                                        <Text>on the page</Text>
                                    </Flex>
                                </Col>
                                <Col xs={8}>
                                    <BasePagination
                                        onChange={({ selected }) =>
                                            setFilter((filter) => ({
                                                ...filter,
                                                page: selected,
                                            }))
                                        }
                                        pageCount={totalPages}
                                    />
                                </Col>
                            </Row>
                        )}
                    </Content>
                </Col>
            </Row>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        entities: get(state, "normalizer.entities", {}),
        staff: get(state, "normalizer.data.staff-list.result.content", []),
        isFetched: get(state, "normalizer.data.staff-list.isFetched", false),
        roles: get(
            state,
            "normalizer.data.account-types-list.result.content",
            []
        ),
        countries: get(state, "normalizer.data.country-list.result", []),
        totalPages: get(
            state,
            "normalizer.data.staff-list.result.totalPages",
            0
        ),
        pageSize: get(state, "normalizer.data.staff-list.result.size", 10),
        pageNumber: get(state, "normalizer.data.staff-list.result.number", 0),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStaffListDispatch: (params) =>
            dispatch({
                type: Actions.GET_STAFF_LIST.REQUEST,
                payload: { params },
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
)(withRouter(AccountsContainer));
