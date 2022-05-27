import React, { useEffect, useRef, useState } from "react";
import BaseBreadcrumb from "../../../components/base-breadcrumb";
import Content from "../../../components/content";
import { Col, Container, Row } from "react-grid-system";
import moment from "moment";
import { connect, useDispatch, useSelector } from "react-redux";
import { get, isEmpty, isEqual, values } from "lodash";
import { withRouter } from "react-router-dom";
import BaseButton from "../../../components/base-button";
import BaseTable from "../../../components/base-table";
import BasePagination from "../../../components/base-pagination";
import Text from "../../../components/text";
import { Link } from "react-router-dom";
import BaseSelect from "../../../components/base-select";
import Flex from "../../../components/flex";
import Actions from "../Actions";
import AccountActions from "../../accounts/Actions";
import Normalizer from "../../../services/normalizer";
import ContentLoader from "../../../components/loader/ContentLoader";
import CountryScheme from "../../../schema/CountryScheme";
import BaseDatePicker from "../../../components/base-datepicker";
import EventScheme from "../../../schema/EventScheme";
import HasAccess from "../../../services/auth/HasAccess";

const UsersEventsContainer = ({
  history,
  getEventsListDispatch,
  getCountryListDispatch,
  entities,
  events,
  isFetched,
  countries,
  totalPages,
  pageSize,
  getLangListDispatch,
  langs,
}) => {
  
  const dispatch = useDispatch();
  const select = useSelector((state) => state.users.oldPaginationPage);
  useEffect(() => {
    dispatch({type: Actions.SET_INITIAL_USERS_PAGINATION_PAGE, payload: false})
  }, []);

  const [filter, setFilter] = useState({
    searchingField: "",
    countryId: "",
    page: 0,
    size: pageSize,
    language: "en",
  });

  useEffect(() => {
    getCountryListDispatch();
    getLangListDispatch();
  }, []);
  useEffect(() => {
    getEventsListDispatch({ ...filter });
  }, [filter]);

  events = Normalizer.Denormalize(events, [EventScheme], entities);
  countries = Normalizer.Denormalize(countries, [CountryScheme], entities).map(
    ({ id, name }) => ({
      value: id,
      label: name,
    })
  );

  const refCountrySelect = useRef();

  const clearCountrySelect = () => {
    refCountrySelect.current.select.clearValue();
  };

  const clearSelect = () => {
    clearCountrySelect();
  };

  langs = values(langs).map(({ lang, title }) => ({
    value: lang,
    label: title,
  }));
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
                name: "Events",
                url: "/users/events",
              },
            ]}
          />
        </Col>
        <Col xs={12}>
          <Content>
            <Row align={"center"} className={"mb-16"}>
              <Col xs={8.5}>
                <Flex>
                  <BaseDatePicker placeholder={"From"} />
                  <BaseDatePicker placeholder={"Till"} margin={"0 0 0 5px"} />
                  <BaseSelect
                    ref={refCountrySelect}
                    handleChange={(values) =>
                      setFilter((filter) => ({
                        ...filter,
                        countryId: get(values, "value", ""),
                      }))
                    }
                    options={countries}
                    margin={"0 0 0 5px"}
                    width={"200px"}
                    placeholder={"Country"}
                    isSearchable={true}
                  />
                  <BaseSelect
                    defaultValue={get(filter, "language", "en")}
                    handleChange={(values) =>
                      setFilter((filter) => ({
                        ...filter,
                        language: get(values, "value", ""),
                      }))
                    }
                    options={langs}
                    margin={"0 0 0 5px"}
                    width={"175px"}
                    placeholder={"Language"}
                  />
                  <BaseSelect
                    margin={"0 0 0 5px"}
                    width={"175px"}
                    placeholder={"Status"}
                  />
                </Flex>
              </Col>
              <Col xs={3.5} className={"text-right"}>
                <BaseButton
                  handleClick={() => {
                    setFilter((filter) => ({
                      ...filter,
                      lastActiveDays: 0,
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
                    userCan(permissions, "SAVE_EVENT") && (
                      <BaseButton
                        primary
                        handleClick={() => history.push("/users/event/create")}
                      >
                        Create
                      </BaseButton>
                    )
                  }
                </HasAccess>
              </Col>
            </Row>
            <Row className={"mb-32"}>
              <Col xs={12}>
                {isFetched ? (
                  <BaseTable
                    tableHeader={[
                      "ID",
                      "Country",
                      "Language",
                      "Title",
                      "Status",
                      "Start date",
                      "End Date",
                      "Opens",
                    ]}
                  >
                    {!isEmpty(events) ? (
                      events.map((event, index) => (
                        <tr key={get(event, "id", null)}>
                          <td>
                            <Link
                              to={
                                `/users/event/${
                                  isEqual(get(event, "status"), "SUCCESSFULLY")
                                    ? "success/"
                                    : isEqual(get(event, "status"), "SCHEDULED")
                                    ? "scheduled/"
                                    : isEqual(get(event, "status"), "CANCELLED")
                                    ? "cancelled/"
                                    : "started/"
                                }` + get(event, "id", null)
                              }
                            >
                              {get(event, "serialNumber", null)}
                            </Link>
                          </td>
                          <td>{get(event, "country")}</td>
                          <td>{get(event, "language")}</td>
                          <td>{get(event, "title")}</td>
                          <td>
                            {isEqual(get(event, "status"), "SUCCESSFULLY") && (
                              <Text sm success>
                                Successful
                              </Text>
                            )}
                            {isEqual(get(event, "status"), "SCHEDULED") && (
                              <Text sm primary>
                                Scheduled
                              </Text>
                            )}
                            {isEqual(get(event, "status"), "CANCELLED") && (
                              <Text sm danger>
                                Cancelled
                              </Text>
                            )}
                          </td>
                          <td>
                            {moment(get(event, "fromTime")).format(
                              "DD.MM.YYYY"
                            )}
                          </td>
                          <td>
                            {moment(get(event, "tillTime")).format(
                              "DD.MM.YYYY"
                            )}
                          </td>
                          <td>{get(event, "opensCount")}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9}>No data</td>
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
    events: get(state, "normalizer.data.events-list.result.content", []),
    isFetched: get(state, "normalizer.data.events-list.isFetched", false),
    countries: get(state, "normalizer.data.country-list.result", []),
    langs: get(state, "normalizer.data.lang-list.result", {}),
    totalPages: get(state, "normalizer.data.events-list.result.totalPages", 0),
    pageSize: get(state, "normalizer.data.events-list.result.size", 10),
    pageNumber: get(state, "normalizer.data.events-list.result.number", 0),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEventsListDispatch: (params) =>
      dispatch({ type: Actions.GET_EVENTS_LIST.REQUEST, payload: { params } }),
    getCountryListDispatch: () =>
      dispatch({
        type: AccountActions.GET_COUNTRY_LIST.REQUEST,
        payload: { params: {} },
      }),
    getLangListDispatch: () =>
      dispatch({
        type: Actions.GET_LANG_LIST.REQUEST,
        payload: { params: {} },
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UsersEventsContainer));
