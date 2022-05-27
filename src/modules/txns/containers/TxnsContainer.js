import React, { useEffect, useRef, useState } from "react";
import { get, isEmpty, isEqual, round, includes } from "lodash";
import { Col, Container, Row } from "react-grid-system";
import {isPossiblePhoneNumber, formatPhoneNumberIntl} from 'react-phone-number-input';
import moment from "moment";
import { withRouter, Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import BaseBreadcrumb from "../../../components/base-breadcrumb";
import Content from "../../../components/content";
import BaseTable from "../../../components/base-table";
import BaseSelect from "../../../components/base-select";
import BaseInput from "../../../components/base-input";
import BaseButton from "../../../components/base-button";
import Actions from "../Actions";
import AccountActions from "../../accounts/Actions";
import Normalizer from "../../../services/normalizer";
import ContentLoader from "../../../components/loader/ContentLoader";
import Flex from "../../../components/flex";
import CountryScheme from "../../../schema/CountryScheme";
import BasePagination from "../../../components/base-pagination";
import Text from "../../../components/text";
import ApiService from "../ApiService";
import { toast } from "react-toastify";
import Loader from "../../../components/loader";
import TxnsScheme from "../../../schema/TxnsScheme";
import BaseDatePicker from "../../../components/base-datepicker";
import refundedIcon from "../../../assets/images/icons/refunded.svg";
import failedIcon from "../../../assets/images/icons/failed.svg";
import holdIcon from "../../../assets/images/icons/paused.svg";
import completedIcon from "../../../assets/images/icons/completed.svg";
import { ReactSVG } from "react-svg";
import NumberFormat from "react-number-format";
import Title from "../../../components/title";
import { saveFile } from "../../../utils";
import NormalizerActions from "../../../services/normalizer/actions";

const TxnsContainer = ({
  history,
  entities,
  txns,
  isFetched,
  countries,
  getCountryListDispatch,
  getTxnsListDispatch,
  totalPages,
  pageSize,
  pageNumber,
  getTxnsReportCountDispatch,
  report,
  setTriggerListDispatch,
}) => {
  const searchFied = JSON.parse(sessionStorage.getItem("searchFied"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type: Actions.SET_OLD_PAGINATION_PAGE, payload: false})
  });
  const select = useSelector((state) => state.txns.oldPaginationPage);

  const [filter, setFilter] = useState({
    txnStatusEnum: "ALL",
    countryId: "",
    fromDate: moment().startOf("month").format("YYYY-MM-DD"),
    toDate: moment().add(1, "days").format("YYYY-MM-DD"),
    searchingField: searchFied || "",
    size: pageSize,
    page: select ? pageNumber: 0,
  });

  const [loading, setLoading] = useState(false);
  const [clear, setClear] = useState("");

  
  useEffect(() => {
    getCountryListDispatch();
  }, []);

  useEffect(() => {
    setTriggerListDispatch();
    getTxnsListDispatch({ ...filter });
    getTxnsReportCountDispatch(
      get(filter, "countryId"),
      get(filter, "fromDate"),
      get(filter, "toDate"),
      get(filter, "txnStatusEnum"),
    );
  }, [filter]);

  const refCountrySelect = useRef();
  const refStatusSelect = useRef();

  txns = Normalizer.Denormalize(txns, [TxnsScheme], entities);

  countries = Normalizer.Denormalize(countries, [CountryScheme], entities).map(
    ({ id, name }) => ({
      value: id,
      label: name,
    })
  );




  const downloadExcelFile = () => {
    setLoading(true);
    ApiService.DownloadTxnsExcelFile(filter)
      .then((res) => {
        if (res && res.data) {
          setLoading(false);
          saveFile(res, moment(), "xlsx");
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

  const clearCountrySelect = () => {
    refCountrySelect.current.select.clearValue();
  };

  const clearStatusSelect = () => {
    refStatusSelect.current.select.clearValue();
  };

  const clearSelect = () => {
    clearCountrySelect();
    clearStatusSelect();
    setClear("");
    sessionStorage.clear();
    setFilter((filter) => ({ ...filter, txnStatusEnum: "ALL", searchingField: "" }));
  };
  
  return (
    <Container fluid>
      <Row>
        <Col xs={12}>{loading && <Loader />}</Col>
        <Col xs={12} className={"mb-8"}>
          <BaseBreadcrumb items={[{ id: 1, name: "TXNS", url: "/txns" }]} />
        </Col>
        <Col xs={12} className={"mb-32"}>
          <Content>
            <Row align={"center"} className={"mb-16"}>
              <Col xs={8.5}>
                <Flex>
                  <BaseDatePicker
                    defaultDate={moment(get(filter, "fromDate")).toDate()}
                    value={get(filter, "fromDate")}
                    handleDate={(date) =>
                      setFilter((filter) => ({
                        ...filter,
                        fromDate: moment(date).format("YYYY-MM-DD"),
                      }))
                    }
                    placeholder={"From"}
                  />
                  <BaseDatePicker
                    defaultDate={moment().add(1, "days").toDate()}
                    value={get(filter, "toDate")}
                    handleDate={(date) =>
                      setFilter((filter) => ({
                        ...filter,
                        toDate: moment(date).format("YYYY-MM-DD"),
                      }))
                    }
                    placeholder={"Till"}
                    margin={"0 0 0 5px"}
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
                    placeholder={"Country"}
                    width={"130px"}
                    margin={"0 0 0 5px"}
                    isSearchable={true}
                  />
                  {/* Filter receiving countries */}
                  <BaseSelect 
                      ref = {refStatusSelect} 
                      handleChange = {(values) => setFilter(filter => ({
                          ...filter,
                          txnStatusEnum: get(values, 'value', '')
                          }))} 
                      options = {[
                        {value: 'SUCCESSFUL', label: 'Successful'},
                        {value: 'HOLD', label: 'Hold'},
                        {value: 'FAILED', label: 'Failed'},
                        {value: 'REFUNDED', label: 'Refunded'},
                      ]} 
                      placeholder = {'Status'} 
                      width = {'130px'}
                      margin={'0 0 0 5px'}/>

                  <BaseInput
                    value={searchFied || clear}
                    handleInput={(val) => {
                      setClear(val);
                      setFilter((filter) => ({
                        ...filter,
                        searchingField: val,
                      }));
                      sessionStorage.setItem("searchFied", JSON.stringify(val));
                    }}
                    width = {"30%"}
                    placeholder={"Search by TXN Number/Phone number ..."}
                    margin={"0 0 0 5px"}
                  />
                </Flex>
              </Col>
              <Col xs={3.5} className={"text-right"}>
                <BaseButton
                  handleClick={() => {
                    setFilter((filter) => ({
                      ...filter,
                      fromDate: moment("2021-09-01").format("YYYY-MM-DD"),
                      toDate: moment().add(1, "days").format("YYYY-MM-DD"),
                      roleId: "",
                      searchingField: "",
                    }));
                    clearSelect();
                  }}
                  danger
                  className={"mr-2"}
                >
                  Reset
                </BaseButton>

                <BaseButton
                  handleClick={() => downloadExcelFile()}
                  className={"ml-2"}
                >
                  Save as Excel
                </BaseButton>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Row>
                  <Col xs={4}>
                    <Flex>
                      <Text large className={"mr-16"}>
                        Total TXNs:
                      </Text>
                      <Title md>{get(report, "totalTxn", 0)}</Title>
                    </Flex>
                  </Col>
                  <Col xs={4}>
                    <Flex>
                      <Text large className={"mr-16"}>
                        Total amount:
                      </Text>
                      <Title md>
                        {get(report, "totalAmountCurrency", "")}
                        <NumberFormat
                          displayType={"text"}
                          thousandSeparator={","}
                          value={round(get(report, "totalAmount", 0), 2)}
                        />
                      </Title>
                    </Flex>
                  </Col>
                  <Col xs={4}>
                    <Flex>
                      <Text large className={"mr-16"}>
                        Total collected:
                      </Text>
                      <Title md>
                        {" "}
                        {get(report, "collectedCurrency", "")}
                        <NumberFormat
                          displayType={"text"}
                          thousandSeparator={","}
                          value={round(get(report, "collected", 0), 2)}
                        />
                      </Title>
                    </Flex>
                  </Col>
                  <Col xs={12} className={"mt-24"}>
                    <hr />
                  </Col>
                </Row>
              </Col>
              <Col xs={12} className={"mb-32"}>
                {isFetched ? (
                  <BaseTable
                    tableHeader={[
                      "TXN Number",
                      "Country Code",
                      "Sender",
                      "Payment Method",
                      "WD Amount",
                      "Amount Sent USD",
                      "Received",
                      "USD to Receive rate",
                      "Receiving Country",
                      "Receiver Number",
                      "Date",
                      "Status",
                      "PL",
                      "Api Rate",
                      "Payment Captured",
                      "IP Address",
                      "Total Cost",
                    ]}
                  >
                    {!isEmpty(txns) ? (
                      txns.map((item, index) => (
                        <tr key={get(item, "id", null)}>
                          <td>
                            <Link to={"/txns/detail/" + get(item, "id", null)}>
                              {get(item, "txnNumber", 0)}
                            </Link>
                          </td>
                          <td>{get(item, "countryCode", "-")}</td>
                          <td className={"minWidth-tdPhone"}>{get(item, "sender", '') && isPossiblePhoneNumber(get(item, "sender")) ? formatPhoneNumberIntl(get(item, "sender")) : formatPhoneNumberIntl(includes(get(item, "sender", "-"), 'T') ? get(item, "sender", "-").split('-')[0] : (includes(get(item, "sender", "-"), '-') ? get(item, "sender", "-").split('-')[0] : get(item, "sender")))}</td>
                          <td>
                            {get(item, "paymentMethod", "-")}
                            <br />
                            ...{get(item, "last4", "")}
                          </td>
                          <td>
                            <NumberFormat
                              displayType={"text"}
                              thousandSeparator={","}
                              value={round(get(item, "wdAmount", 0), 2)}
                            />
                          </td>
                          <td>
                            <NumberFormat
                              displayType={"text"}
                              thousandSeparator={","}
                              value={round(get(item, "amountUsd", ""), 2)}
                            />
                          </td>
                          <td>
                            <NumberFormat
                              displayType={"text"}
                              thousandSeparator={","}
                              value={round(get(item, "receive", ""), 2)}
                            />
                          </td>
                          <td>
                            <NumberFormat
                              displayType={"text"}
                              thousandSeparator={","}
                              value={round(get(item, "usdReceiveRate"), 4)}
                            />
                          </td>
                          <td>{get(item, "receivedCountryIso", "-")}</td>
                          <td className={"minWidth-tdPhone"}>{get(item, "phoneNumber", '') && isPossiblePhoneNumber(get(item, "phoneNumber")) ? formatPhoneNumberIntl(get(item, "phoneNumber")) : formatPhoneNumberIntl(includes(get(item, "phoneNumber", "-"), 'T') ? get(item, "phoneNumber", "-").split('-')[0] : (includes(get(item, "phoneNumber", "-"), '-') ? get(item, "phoneNumber", "-").split('-')[0] : get(item, "phoneNumber")))}</td>
                          <td>
                            {moment(get(item, "date")).format(
                              "DD.MM.YYYY hh:mm A"
                            )}
                          </td>
                          <td>
                            {isEqual(
                              get(item, "status", "ALL"),
                              "SUCCESSFUL"
                            ) && <ReactSVG src={completedIcon} />}
                            {isEqual(get(item, "status", "ALL"), "HOLD") && (
                              <ReactSVG src={holdIcon} />
                            )}
                            {isEqual(get(item, "status", "ALL"), "FAILED") && (
                              <ReactSVG src={failedIcon} />
                            )}
                            {isEqual(
                              get(item, "status", "ALL"),
                              "REFUNDED"
                            ) && <ReactSVG src={refundedIcon} />}
                          </td>
                          <td>
                            <NumberFormat
                              displayType={"text"}
                              thousandSeparator={","}
                              value={round(get(item, "pl", ""), 2)}
                            />
                          </td>
                          <td>
                            <NumberFormat
                              displayType={"text"}
                              thousandSeparator={","}
                              value={round(get(item, "apiRate", ""), 2)}
                            />
                          </td>
                          <td>
                            {get(item, "paymentCaptured", "-")}
                          </td>
                          <td>
                            {get(item, "ipAddress", "-")}
                          </td>
                          <td>
                            <NumberFormat
                              displayType={"text"}
                              thousandSeparator={","}
                              value={round(get(item, "totalCost", ""), 2)}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={17}>No data</td>
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
    txns: get(state, "normalizer.data.txns-list.result.content", []),
    isFetched: get(state, "normalizer.data.txns-list.isFetched", false),
    countries: get(state, "normalizer.data.country-list.result", []),
    report: get(state, "normalizer.data.report-count.result", {}),
    totalPages: get(state, "normalizer.data.txns-list.result.totalPages", 0),
    pageSize: get(state, "normalizer.data.txns-list.result.size", 10),
    pageNumber: get(state, "normalizer.data.txns-list.result.number", 0),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTxnsListDispatch: (params) =>
      dispatch({ type: Actions.GET_TXNS_LIST.REQUEST, payload: { params } }),
    getCountryListDispatch: () =>
      dispatch({
        type: AccountActions.GET_COUNTRY_LIST.REQUEST,
        payload: { params: {} },
      }),
    getTxnsReportCountDispatch: (id = "", fromDate = "", toDate = "", txnStatusEnum = "") =>
      dispatch({
        type: Actions.GET_TXNS_REPORT_COUNT.REQUEST,
        payload: { id, fromDate, toDate, txnStatusEnum },
      }),
    setTriggerListDispatch: () =>
      dispatch({
        type: NormalizerActions.NORMALIZE.TRIGGER,
        payload: { storeName: "txns-list" },
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TxnsContainer));
