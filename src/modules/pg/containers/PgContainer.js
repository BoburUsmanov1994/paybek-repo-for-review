import React, { useEffect, useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import { Col, Container, Row } from "react-grid-system";
import { connect, useDispatch } from "react-redux";
import BaseBreadcrumb from "../../../components/base-breadcrumb";
import Content from "../../../components/content";
import BaseTable from "../../../components/base-table";
import BasePagination from "../../../components/base-pagination";
import Text from "../../../components/text";
import BaseButton from "../../../components/base-button";
import { get, isEmpty, isEqual, round } from "lodash";
import Actions from "../Actions";
import TXNSActions from '../../txns/Actions';
import Flex from "../../../components/flex";
import BaseSelect from "../../../components/base-select";
import NumberFormat from "react-number-format";
import ContentLoader from "../../../components/loader/ContentLoader";
import Normalizer from "../../../services/normalizer";
import PgScheme from "../../../schema/PgScheme";
import { Edit } from "react-feather";
import AccountActions from "../../accounts/Actions";
import NormalizerActions from "../../../services/normalizer/actions";
import CountryScheme from "../../../schema/CountryScheme";

const PgContainer = ({
  history,
  getPgListDispatch,
  entities,
  pg,
  isFetched,
  totalPages,
  pageNumber,
  pageSize,
  countries,
  getCountryListDispatch,
  setTriggerListDispatch,
}) => {

  const [filter, setFilter] = useState({
    size: pageSize,
    page: pageNumber,
    countryId: "",
    active: "",
    stripe: "stripe",
  });
  const [collapsedRowId, setCollapsedRowId] = useState(null);
  useEffect(() => {
    getCountryListDispatch();
  }, []);
  useEffect(() => {
    setTriggerListDispatch();
    getPgListDispatch(filter);
  }, [filter]);

  pg = Normalizer.Denormalize(pg, [PgScheme], entities);
  countries = Normalizer.Denormalize(countries, [CountryScheme], entities).map(
    ({ id, name }) => ({
      value: id,
      label: name,
    })
  );

  const refCountrySelect = useRef();
  const refStatusSelect = useRef();

  const clearCountrySelect = () => {
    refCountrySelect.current.select.clearValue();
  };
  const clearStatusSelect = () => {
    refStatusSelect.current.select.clearValue();
  };

  const clearSelect = () => {
    clearCountrySelect();
    clearStatusSelect();
  };

  return (
    <Container>
      <Row>
        <Col xs={12}>
          {" "}
          <BaseBreadcrumb items={[{ id: 1, name: "PG", url: "/pg" }]} />
        </Col>
        <Col xs={12}>
          <Content>
            <Row>
              <Col xs={8}>
                <Flex>
                  <BaseSelect
                    defaultValue={"stripe"}
                    handleChange={(values) =>
                      setFilter((filter) => ({
                        ...filter,
                        stripe: get(values, "value", ""),
                      }))
                    }
                    options={[{ value: "stripe", label: "Stripe" }]}
                    placeholder={"Filter by stripe"}
                    width={"200px"}
                    margin={"0 0 0 15px"}
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
                    placeholder={"Filter by country"}
                    width={"200px"}
                    margin={"0 0 0 15px"}
                    isSearchable={true}
                  />
                  <BaseSelect
                    ref={refStatusSelect}
                    handleChange={(values) =>
                      setFilter((filter) => ({
                        ...filter,
                        status: get(values, "value", ""),
                      }))
                    }
                    options={[
                      { value: true, label: "ACTIVE" },
                      { value: false, label: "INACTIVE" },
                    ]}
                    placeholder={"Filter by status"}
                    width={"200px"}
                    margin={"0 0 0 15px"}
                  />
                </Flex>
              </Col>
              <Col xs={4} className={"text-right mb-16"}>
                <BaseButton danger handleClick={clearSelect}>
                  Reset
                </BaseButton>{" "}
                <BaseButton
                  primary
                  handleClick={() => history.push("/pg/group/update/")}
                >
                  Group Edit
                </BaseButton>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className={"mb-32"}>
                {isFetched ? (
                  <BaseTable
                    tableHeader={[
                      "Country",
                      "Collecting Currency",
                      "PBS",
                      "TXN Fee",
                      "Volume Fee %",
                      "Int. card fee",
                      "Exchange fee",
                      "Radar fee",
                      "Partner Rate",
                      "Total Cost",
                      "PG margin %",
                      "API Rate",
                      "Status",
                      "Action",
                    ]}
                  >
                    {!isEmpty(pg) ? (
                      pg.map((item, index) => (
                        <>
                          <tr
                            className={"cursor-pointer"}
                            key={get(item, "id", null)}
                            onClick={() =>
                              setCollapsedRowId((id) =>
                                get(item, "id", null) == id
                                  ? null
                                  : get(item, "id", null)
                              )
                            }
                          >
                            <td>{get(item, "country.name", "-")}</td>
                            <td>{get(item, "country.currencyIso", "-")}</td>
                            <td>
                              <NumberFormat
                                displayType={"text"}
                                thousandSeparator={","}
                                value={round(get(item, "avgPbs", 0), 2)}
                              />
                            </td>
                            <td>
                              <NumberFormat
                                displayType={"text"}
                                thousandSeparator={","}
                                value={round(get(item, "txnFee", 0), 2)}
                              />
                            </td>
                            <td>
                              <NumberFormat
                                displayType={"text"}
                                thousandSeparator={","}
                                value={round(get(item, "volumeFee", ""), 2)}
                              />{" "}
                              %
                            </td>
                            <td>
                              <NumberFormat
                                displayType={"text"}
                                thousandSeparator={","}
                                value={round(get(item, "intCardFee", ""), 2)}
                              />{" "}
                              %
                            </td>
                            <td>
                              <NumberFormat
                                displayType={"text"}
                                thousandSeparator={","}
                                value={round(get(item, "exchangeFee", ""), 2)}
                              />{" "}
                              %
                            </td>
                            <td>
                              <NumberFormat
                                displayType={"text"}
                                thousandSeparator={","}
                                value={round(get(item, "radarFee", ""), 2)}
                              />{" "}
                              
                            </td>
                            <td>
                              <a href={"#"}>
                                <NumberFormat
                                  displayType={"text"}
                                  thousandSeparator={","}
                                  value={round(get(item, "avg", ""), 2)}
                                />
                              </a>
                            </td>
                            <td>-</td>
                            <td>{get(item, "paybekMargin")} %</td>
                            <td>-</td>
                            <td>
                              {get(item, "active") ? (
                                <Text success>ON</Text>
                              ) : (
                                <Text danger>OFF</Text>
                              )}
                            </td>
                            <td>
                              <Edit
                                onClick={() =>
                                  history.push(
                                    "/pg/update/" + get(item, "id", null)
                                  )
                                }
                                className={"cursor-pointer mr-4"}
                                color="#53AC92"
                                size={20}
                              />
                            </td>
                          </tr>
                          {isEqual(collapsedRowId, get(item, "id")) &&
                            get(item, "operators") &&
                            get(item, "operators", []).map(
                              (operator, index) => (
                                <tr key={index}>
                                  <td>{get(operator, "name")}</td>
                                  <td colSpan={1}></td>
                                  <td>
                                    <NumberFormat
                                      displayType={"text"}
                                      thousandSeparator={","}
                                      value={round(get(operator, "pbs", ""), 2)}
                                    />
                                  </td>
                                  <td colSpan={1}></td>
                                  <td colSpan={1}></td>
                                  <td colSpan={1}></td>
                                  <td colSpan={1}></td>
                                  <td colSpan={1}></td>
                                  <td>
                                    <NumberFormat
                                      displayType={"text"}
                                      thousandSeparator={","}
                                      value={round(
                                        get(operator, "amount", ""),
                                        2
                                      )}
                                    />
                                  </td>
                                  <td colSpan={5}></td>
                                </tr>
                              )
                            )}
                        </>
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
                          value: 20,
                          label: 20,
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
    pg: get(state, "normalizer.data.pg-list.result.content", []),
    isFetched: get(state, "normalizer.data.pg-list.isFetched", false),
    totalPages: get(state, "normalizer.data.pg-list.result.totalPages", 0),
    pageSize: get(state, "normalizer.data.pg-list.result.size", 10),
    pageNumber: get(state, "normalizer.data.pg-list.result.number", 0),
    countries: get(state, "normalizer.data.country-list.result", []),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPgListDispatch: (params) =>
      dispatch({ type: Actions.GET_PG_LIST.REQUEST, payload: { params } }),
    getCountryListDispatch: () =>
      dispatch({
        type: AccountActions.GET_COUNTRY_LIST.REQUEST,
        payload: { params: {} },
      }),
    setTriggerListDispatch: () =>
      dispatch({
        type: NormalizerActions.NORMALIZE.TRIGGER,
        payload: { storeName: "pg-list" },
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PgContainer));
