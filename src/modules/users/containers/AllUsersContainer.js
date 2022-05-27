import React, { useEffect, useRef, useState } from "react";
import BaseBreadcrumb from "../../../components/base-breadcrumb";
import Content from "../../../components/content";
import {isPossiblePhoneNumber, formatPhoneNumberIntl} from 'react-phone-number-input';
import { Col, Container, Row } from "react-grid-system";
import { connect, useDispatch, useSelector } from "react-redux";
import { get, isEmpty, values, includes } from "lodash";
import BaseInput from "../../../components/base-input";
import BaseButton from "../../../components/base-button";
import BaseTable from "../../../components/base-table";
import BasePagination from "../../../components/base-pagination";
import Text from "../../../components/text";
import { Link } from "react-router-dom";
import BaseSelect from "../../../components/base-select";
import Flex from "../../../components/flex";
import Actions from "../Actions";
import TXNSActions from '../../txns/Actions';
import AccountActions from "../../accounts/Actions";
import Normalizer from "../../../services/normalizer";
import ClientScheme from "../../../schema/ClientScheme";
import ContentLoader from "../../../components/loader/ContentLoader";
import CountryScheme from "../../../schema/CountryScheme";
import moment from "moment";
import HasAccess from "../../../services/auth/HasAccess";
import { Edit, Trash } from "react-feather";
import NormalizerActions from "../../../services/normalizer/actions";
import Title from "../../../components/title";

const UsersActiveContainer = ({
  getClientsListDispatch,
  getCountryListDispatch,
  entities,
  clients,
  isFetched,
  countries,
  totalPages,
  pageSize,
  getCardListDispatch,
  setTriggerListDispatch,
  pageNumber,
  cards,
  report,
  getUsersStatusReport,
  usersStatusReport
}) => {
  const searchBox = JSON.parse(sessionStorage.getItem("searchBox"));

  const dispatch = useDispatch();
  // txns pagination, returns initial page number  
  useEffect(() => {
    dispatch({type: TXNSActions.SET_OLD_PAGINATION_PAGE, payload: false})
  }, []);

  useEffect(() => {
    dispatch({type: Actions.SET_INITIAL_USERS_PAGINATION_PAGE, payload: false})
  }, []);

  const select = useSelector((state) => state.users.oldPaginationPage);

  const [filter, setFilter] = useState({
    status: "ALL",
    searchingField: searchBox || "",
    cardBrand: "",
    countryId: "",
    // lastActiveDays: 30,
    page: select ? pageNumber : 0,
    size: pageSize,
  });
  const [clear, setClear] = useState("");
  useEffect(() => {
    getCountryListDispatch();
    getCardListDispatch();
    getUsersStatusReport();
  }, []);
  useEffect(() => {
    setTriggerListDispatch();
    getClientsListDispatch({ ...filter });
  }, [filter]);

  clients = Normalizer.Denormalize(clients, [ClientScheme], entities);
  cards = values(cards).map((card) => ({ value: card, label: card }));
  countries = Normalizer.Denormalize(countries, [CountryScheme], entities).map(
    ({ id, name }) => ({
      value: id,
      label: name,
    })
  );

  const refCountrySelect = useRef();
  const refCardSelect = useRef();
  // it is giving error
  const refStatusSelect = useRef();

  const clearCountrySelect = () => {
    refCountrySelect.current.select.clearValue();
  };

  const clearCardSelect = () => {
    refCardSelect.current.select.clearValue();
  };

  const clearStatusSelect = () => {
    refStatusSelect.current.select.clearValue();
  };

  const clearSelect = () => {
    clearCountrySelect();
    clearCardSelect();
    clearStatusSelect();
    setClear("");
    sessionStorage.clear();
    setFilter((filter) => ({ ...filter, searchingField: "", status: "ALL" }));
  };

  
  return (
    <Container fluid>
      <Row>
        <Col xs={12} className={"mb-8"}>
          <BaseBreadcrumb
            items={[
              {
                id: 1,
                name: "Users",
                url: "/users",
              },
              {
                id: 2,
                name: "All Users",
                url: "/users/all",
              },
            ]}
          />
        </Col>
        <Col xs={12}>
          <Content>
            <Row align={"center"} className={"mb-16"}>
              <Col xs={9}>
                <Flex>
                  <BaseInput
                    value={searchBox || clear}
                    placeholder={"Search by User ID/Phone # ..."}
                    handleInput={(val) => {
                      setClear(val);
                      setFilter((filter) => ({
                        ...filter,
                        searchingField: val,
                      }));
                      sessionStorage.setItem("searchBox", JSON.stringify(val));
                    }}
                  />
                  <BaseSelect
                    ref={refStatusSelect}
                    handleChange={(values) =>
                      setFilter((filter) => ({
                        ...filter,
                        status: get(values, "value", 0),
                      }))
                    }
                    options={[
                      { value: "ACTIVE", label: "Active"},
                      { value: "INACTIVE", label: "Inactive"},
                      { value: "BLOCKED", label: "Blocked"},
                      { value: "DELETED", label: "Deleted"},
                    ]}
                    margin={"0 0 0 15px"}
                    width={"250px"}
                    placeholder={"Select status"}
                  />
                  <BaseSelect
                    ref={refCountrySelect}
                    handleChange={(values) =>
                      setFilter((filter) => ({
                        ...filter,
                        countryId: get(values, "value", ""),
                      }))
                    }
                    options={countries}
                    margin={"0 0 0 15px"}
                    width={"200px"}
                    placeholder={"Country"}
                    isSearchable={true}
                  />
                  <BaseSelect
                    ref={refCardSelect}
                    margin={"0 0 0 15px"}
                    width={"175px"}
                    placeholder={"Card"}
                    options={cards}
                    handleChange={(values) =>
                      setFilter((filter) => ({
                        ...filter,
                        cardBrand: get(values, "value", ""),
                      }))
                    }
                  />
                </Flex>
              </Col>
              <Col xs={3} className={"text-right"}>
                <BaseButton
                  handleClick={() => {
                    setFilter((filter) => ({
                      ...filter,
                      lastActiveDays: 30,
                      countryId: "",
                    }));
                    clearSelect();
                  }}
                  danger
                  className={"mr-4"}
                >
                  Reset
                </BaseButton>
              </Col>
            </Row>
            <Row style={{alignItems: 'center'}}>
              <Col xs={12} className={"mb-24"}>
                <hr />
              </Col>
              <Col xs = {12}>
                <Row>
                  <Col xs = {2}>
                    <Flex>
                      <Text medium className={"mr-8"}>
                        Total Users:
                      </Text>
                      <Title md>{get(usersStatusReport, "allUsersCount", "-")}</Title>
                    </Flex>
                  </Col>
                  <Col xs = {2}>
                    <Flex>
                      <Text medium className={"mr-8"}>
                       Active:
                      </Text>
                      <Title md>{get(usersStatusReport, "activeUsersCount", "-")}</Title>
                    </Flex>
                  </Col>
                  <Col xs = {2}>
                    <Flex>
                      <Text medium className={"mr-8"}>
                        Inactive:
                      </Text>
                      <Title md>{get(usersStatusReport, "inActiveUsersCount", "-")}</Title>
                    </Flex>
                  </Col>
                  <Col xs = {1.5}>
                    <Flex>
                      <Text medium className={"mr-8"}>
                        Blocked:
                      </Text>
                      <Title md>{get(usersStatusReport, "blockedUsersCount", "-")}</Title>
                    </Flex>
                  </Col>
                  <Col xs = {1.5}>
                    <Flex>
                      <Text medium className={"mr-8"}>
                        Deleted:
                      </Text>
                      <Title md>{get(usersStatusReport, "deletedUsersCount", "-")}</Title>
                    </Flex>
                  </Col>
                  <Col xs = {3}>
                    <Flex>
                      <Text medium className={"mr-8"}>
                        Last Sign-ups in 24 hr:
                      </Text>
                      <Title md>{get(usersStatusReport, "newDailyUserCount", "-")}</Title>
                    </Flex>
                  </Col>
                </Row>
              </Col>
              <Col xs={12} className={"mt-24"}>
                  <hr />
              </Col>
            </Row>
            <Row className={"mb-32"}>
              <Col xs={12}>
                {isFetched ? (
                  <BaseTable
                    tableHeader={[
                      "ID",
                      "Country",
                      "Phone Number",
                      "Card",
                      "Sign up date",
                      "Last Active",
                      "Status",
                      "Action",
                    ]}
                  >
                    {!isEmpty(clients) ? (
                      clients.map((client, index) => (
                        <tr key={get(client, "id", null)}>
                          <td>
                            <Link
                              to={"/users/detail/" + get(client, "id", null)}
                            >
                              {get(client, "serialNumber", null)}
                            </Link>
                          </td>
                          <td>{get(client, "countryName", "-")}</td>
                          <td className={"minWidth-tdPhone"}>{get(client, "phoneNumber", "") ? formatPhoneNumberIntl(includes(get(client, "phoneNumber", "-"), 'T') ? get(client, "phoneNumber", "-").split('-')[0] : (includes(get(client, "phoneNumber", "-"), '-') ? get(client, "phoneNumber", "-").split('-')[0] : get(client, "phoneNumber", "-"))) : '-'}</td>
                          <td>
                            <Text success xs medium>
                              {get(client, "cardName", "-")}
                            </Text>
                          </td>
                          <td>
                            {moment(get(client, "signUpDate")).format(
                              "DD.MM.YYYY hh:mm A"
                            )}
                          </td>
                          <td>
                            {moment(get(client, "lastActive")).format(
                              "DD.MM.YYYY hh:mm A"
                            )}
                          </td>
                          <td>
                              {filter.status === "ALL" ? get(client, "status") === "ACTIVE" ? <Text success>Active</Text> : ( get(client, "status") == "INACTIVE" ? <Text tangerine>Inactive</Text> : (get(client, "status") === "BLOCKED" ? <Text danger>Blocked</Text> : (get(client, "status") === "DELETED" ? <Text gray>Deleted</Text> : null))) :
                              filter.status === "ACTIVE" ? <Text success>Active</Text> : ( filter.status === "INACTIVE" ? <Text tangerine>Inactive</Text> : (filter.status === "BLOCKED" ? <Text danger>Blocked</Text> : (filter.status === "DELETED" ? <Text gray>Deleted</Text> : null)))}
                          </td>
                          <td>
                            <HasAccess>
                              {({ userCan, permissions }) => (
                                <>
                                  {userCan(permissions, "EDIT_ROLE") && (
                                    <Edit
                                      className={"cursor-pointer mr-4"}
                                      color="#53AC92"
                                      size={20}
                                    />
                                  )}
                                </>
                              )}
                            </HasAccess>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={12}>No data</td>
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
                        setFilter((filter) => ({ ...filter, size: value }))
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
                    current={pageNumber}
                    onChange={({ selected }) =>
                      setFilter((filter) => ({ ...filter, page: selected }))
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
    clients: get(state, "normalizer.data.client-list.result.content", []),
    isFetched: get(state, "normalizer.data.client-list.isFetched", false),
    countries: get(state, "normalizer.data.country-list.result", []),
    cards: get(state, "normalizer.data.card-list.result", {}),
    totalPages: get(state, "normalizer.data.client-list.result.totalPages", 0),
    pageSize: get(state, "normalizer.data.client-list.result.size", 10),
    pageNumber: get(state, "normalizer.data.client-list.result.number", 0),
    report: get(state, "normalizer.data.dashboard-data.result.userData", 0),
    usersStatusReport: get(state, "users.userStatus", {})
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getClientsListDispatch: (params) =>
      dispatch({ type: Actions.GET_USERS_LIST.REQUEST, payload: { params } }),
    getCountryListDispatch: () =>
      dispatch({
        type: AccountActions.GET_COUNTRY_LIST.REQUEST,
        payload: { params: {} },
      }),
    getCardListDispatch: () =>
      dispatch({
        type: Actions.GET_CARDS_LIST.REQUEST,
        payload: { params: {} },
      }),
    getUsersStatusReport: () => 
      dispatch({
        type: Actions.LOAD_USERS_BY_STATUS.REQUEST,
      }),
    setTriggerListDispatch: () =>
      dispatch({
        type: NormalizerActions.NORMALIZE.TRIGGER,
        payload: { storeName: "client-list" },
    }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersActiveContainer);
