import React, { useEffect, useState } from "react";
import { get, isEqual, round, values, includes } from "lodash";
import { Col, Container, Row } from "react-grid-system";
import {isPossiblePhoneNumber, formatPhoneNumberIntl} from 'react-phone-number-input';
import { withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import BaseBreadcrumb from "../../../components/base-breadcrumb";
import Content from "../../../components/content";
import Actions from "../Actions";
import Normalizer from "../../../services/normalizer";
import TxnsScheme from "../../../schema/TxnsScheme";
import Flex from "../../../components/flex";
import Title from "../../../components/title";
import Text from "../../../components/text";
import moment from "moment";
import NumberFormat from "react-number-format";
import refundedIcon from "../../../assets/images/icons/refunded.svg";
import failedIcon from "../../../assets/images/icons/failed.svg";
import holdIcon from "../../../assets/images/icons/paused.svg";
import completedIcon from "../../../assets/images/icons/completed.svg";
import { ReactSVG } from "react-svg";
import BaseButton from "../../../components/base-button";
import HasAccess from "../../../services/auth/HasAccess";
import ApiService from "../ApiService";
import { toast } from "react-toastify";
import Loader from "../../../components/loader";
import BaseTable from "../../../components/base-table";
import ContentLoader from "../../../components/loader/ContentLoader";
import { saveFile } from "../../../utils";

const TxnsDetailContainer = ({
  history,
  id,
  entities,
  txns,
  isFetched,
  getTxnsOneDispatch,
  getTxnsStatusCountDispatch,
  getTxnsHistoryDispatch,
  txnsHistory,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: Actions.SET_OLD_PAGINATION_PAGE, payload: true})
  })

  useEffect(() => {
    getTxnsOneDispatch(id);
    getTxnsHistoryDispatch(id);
  }, []);
  txns = Normalizer.Denormalize(txns, TxnsScheme, entities);
  const downloadPdflFile = () => {
    setLoading(true);
    ApiService.DownloadTxnsPdfFile(id)
      .then((res) => {
        if (res && res.data) {
          setLoading(false);
          saveFile(
            res,
            `${get(txns, "txnNumber")}_${moment().format(
              "DD.MM.YYYY"
            )}_${moment().format("hh:mm")}`,
            "pdf"
          );
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
  const updateRefunded = () => {
    setLoading(true);
    ApiService.UpdateTxnsRefund(id)
      .then((res) => {
        if (res) {
          setLoading(false);
          toast.success("Success");
          getTxnsOneDispatch(id);
          getTxnsStatusCountDispatch();
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
  const updateReprocess = () => {
    setLoading(true);
    ApiService.UpdateTxnsReprocess(id)
      .then((res) => {
        if (res) {
          setLoading(false);
          toast.success("Success");
          getTxnsOneDispatch(id);
          getTxnsStatusCountDispatch();
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
  // console.log(txns);
  return (
    <Container fluid>
      {isFetched ? (
        <Row>
          <Col xs={12}>{loading && <Loader />}</Col>
          <Col xs={12} className={"mb-8"}>
            <BaseBreadcrumb items={[{ id: 1, name: "TXNS", url: "/txns" }]} />
          </Col>
          <Col xs={12} className={"mb-32"}>
            <Content className={"p-50 pg-detail"}>
              <Row>
                <Col className={"mb-24"} xs={8}>
                  <Row>
                    <Col xs={6}>
                      <Flex justify={"space-between"}>
                        <Title sm className={"mr-4"}>
                          Opened Date
                        </Title>
                        <Text className={"text-center"}>
                          {moment(get(txns, "date")).format("DD.MM.YYYY")}{" "}
                          <br />
                          {moment(get(txns, "date")).format("HH:SS A")}
                        </Text>
                      </Flex>
                      <hr className={"my-16"} />
                    </Col>
                  </Row>
                </Col>
                <Col className={"mb-48"} xs={12}>
                  <Row>
                    <Col xs={8}>
                      <Flex justify={"space-between"}>
                        <Title sm>
                          Stripe Transaction ID
                        </Title>
                        <Text className={"text-center"}>
                          {get(txns, "stripeId", "-")}
                        </Text>
                      </Flex>
                      <hr className={"my-16"} />
                    </Col>
                  </Row>
                </Col>
                <Col xs={12}>
                  <Row>
                    <Col xs={4}>
                      <Row>
                        <Col xs={12}>
                          <Flex justify={"space-between"}>
                            <Title sm className={"mr-4"}>
                              TXN Number
                            </Title>
                            <Text>{get(txns, "txnNumber")}</Text>
                          </Flex>
                          <hr className={"my-16"} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                          <Flex justify={"space-between"}>
                            <Title sm className={"mr-4"}>
                              Sender
                            </Title>
                            <Text>{ get(txns, 'senderPhoneNumber', '') && isPossiblePhoneNumber(get(txns, "senderPhoneNumber")) ? formatPhoneNumberIntl(get(txns, "senderPhoneNumber")) : formatPhoneNumberIntl(includes(get(txns, "senderPhoneNumber", "-"), 'T') ? get(txns, "senderPhoneNumber", "-").split('-')[0] : (includes(get(txns, "senderPhoneNumber", "-"), '-') ? get(txns, "senderPhoneNumber", "-").split('-')[0] : get(txns, "senderPhoneNumber")))}</Text>
                          </Flex>
                          <hr className={"my-16"} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                          <Flex justify={"space-between"}>
                            <Title sm className={"mr-4"}>
                              Receiving MNO
                            </Title>
                            <Text>{get(txns, "operatorName", "-")}</Text>
                          </Flex>
                          <hr className={"my-16"} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                          <Flex justify={"space-between"}>
                            <Title sm className={"mr-4"}>
                              Payment Method
                            </Title>
                            <Text>{get(txns, "paymentMethod")}</Text>
                          </Flex>
                          <hr className={"my-16"} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                          <Flex justify={"space-between"}>
                            <Title sm className={"mr-4"}>
                              Amount in Local Currency
                            </Title>
                            <Text>
                              <NumberFormat
                                displayType={"text"}
                                thousandSeparator={","}
                                value={round(
                                  get(txns, "amountLocalCurrency"),
                                  2
                                )}
                              />{" "}
                              {get(txns, "senderCurrencyIso")}
                            </Text>
                          </Flex>
                          <hr className={"my-16"} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                          <Flex justify={"space-between"}>
                            <Title sm className={"mr-4"}>
                              Amount in USD
                            </Title>
                            <Text>
                              $
                              <NumberFormat
                                displayType={"text"}
                                thousandSeparator={","}
                                value={round(get(txns, "amountUsd"), 2)}
                              />
                            </Text>
                          </Flex>
                          <hr className={"my-16"} />
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={4}>
                      <Row>
                        <Col xs={12}>
                          <Flex justify={"space-between"}>
                            <Title sm className={"mr-4"}>
                              PG Rate (Stripe)
                            </Title>
                            <Text>
                              <NumberFormat
                                displayType={"text"}
                                thousandSeparator={","}
                                value={round(get(txns, "stripeRate"), 2)}
                              />
                            </Text>
                          </Flex>
                          <hr className={"my-16"} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                          <Flex justify={"space-between"}>
                            <Title sm className={"mr-4"}>
                              3rd Party Rate
                            </Title>
                            <Text>
                              <NumberFormat
                                displayType={"text"}
                                thousandSeparator={","}
                                value={round(get(txns, "usdRate"), 2)}
                              />
                            </Text>
                          </Flex>
                          <hr className={"my-16"} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                          <Flex justify={"space-between"}>
                            <Title sm className={"mr-4"}>
                              Receiver Number
                            </Title>
                            <Text>{get(txns, "receivedCountryIso")}</Text>
                          </Flex>
                          <hr className={"my-16"} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                          <Flex justify={"space-between"}>
                            <Title sm className={"mr-4"}>
                              Receiver Number
                            </Title>
                            <Text>{ get(txns, "receiverPhoneNumber", '') && isPossiblePhoneNumber(get(txns, "receiverPhoneNumber")) ? formatPhoneNumberIntl(get(txns, "receiverPhoneNumber")) : formatPhoneNumberIntl(get(txns, "receiverPhoneNumber"))}</Text>
                          </Flex>
                          <hr className={"my-16"} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                          <Flex justify={"space-between"}>
                            <Title sm className={"mr-4"}>
                              Receiver Currency
                            </Title>
                            <Text>{get(txns, "receivedCurrencyIso")}</Text>
                          </Flex>
                          <hr className={"my-16"} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                          <Flex justify={"space-between"}>
                            <Title sm className={"mr-4"}>
                              Received Amount
                            </Title>
                            <Text>
                              <NumberFormat
                                displayType={"text"}
                                thousandSeparator={","}
                                value={round(get(txns, "receiveAmount"), 2)}
                              />{" "}
                              {get(txns, "receivedCurrencyIso")}
                            </Text>
                          </Flex>
                          <hr className={"my-16"} />
                        </Col>
                      </Row>
                    </Col>

                    <Col xs={4}>
                      <Row>
                        <Col xs={12}>
                          <Flex justify={"space-between"}>
                            <Title sm className={"mr-4"}>
                              Stripe Fee Before
                            </Title>
                            <Text>
                              <NumberFormat
                                displayType={"text"}
                                thousandSeparator={","}
                                value={round(get(txns, "stripeFeeBefore"), 2)}
                              />
                            </Text>
                          </Flex>
                          <hr className={"my-16"} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                          <Flex justify={"space-between"}>
                            <Title sm className={"mr-4"}>
                              Stripe Fee After
                            </Title>
                            <Text>
                              <NumberFormat
                                displayType={"text"}
                                thousandSeparator={","}
                                value={round(get(txns, "stripeFeeAfter"), 2)}
                              />
                            </Text>
                          </Flex>
                          <hr className={"my-16"} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                          <Flex justify={"space-between"}>
                            <Title sm className={"mr-4"}>
                              Status
                            </Title>
                            <Text>
                              {isEqual(
                                get(txns, "status", "ALL"),
                                "SUCCESSFUL"
                              ) && (
                                <Flex>
                                  <ReactSVG
                                    className={"mr-4"}
                                    src={completedIcon}
                                  />
                                  <Text>Completed</Text>
                                </Flex>
                              )}
                              {isEqual(get(txns, "status", "ALL"), "HOLD") && (
                                <Flex>
                                  <ReactSVG className={"mr-4"} src={holdIcon} />
                                  <Text>On hold</Text>
                                </Flex>
                              )}
                              {isEqual(
                                get(txns, "status", "ALL"),
                                "FAILED"
                              ) && (
                                <Flex>
                                  <ReactSVG
                                    className={"mr-4"}
                                    src={failedIcon}
                                  />
                                  <Text>Failed</Text>
                                </Flex>
                              )}
                              {isEqual(
                                get(txns, "status", "ALL"),
                                "REFUNDED"
                              ) && (
                                <Flex>
                                  <ReactSVG
                                    className={"mr-4"}
                                    src={refundedIcon}
                                  />
                                  <Text>Refunded</Text>
                                </Flex>
                              )}
                            </Text>
                          </Flex>
                          <hr className={"my-16 no-print"} />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>

                <Col xs={12}>
                  <Row className={"mb-48 no-print"}>
                    <Col xs={12} className={"text-center"}>
                      <HasAccess>
                        {({ userCan, permissions }) => (
                          <>
                            <BaseButton
                              primary
                              className={"mr-8"}
                              handleClick={() => window.print()}
                            >
                              Print
                            </BaseButton>
                            <BaseButton
                              primary
                              className={"mr-8"}
                              handleClick={() => downloadPdflFile()}
                            >
                              Save as PDF
                            </BaseButton>
                            {userCan(permissions, "REPROCESS_PAYMENT") &&
                              isEqual(get(txns, "status", "ALL"), "HOLD") && (
                                <BaseButton
                                  info
                                  className={"mr-8"}
                                  handleClick={() => updateReprocess()}
                                >
                                  Re-process
                                </BaseButton>
                              )}
                            {userCan(permissions, "REFUND_PAYMENT") &&
                              isEqual(get(txns, "status", "ALL"), "HOLD") && (
                                <BaseButton
                                  primary
                                  handleClick={() => updateRefunded()}
                                >
                                  Refund
                                </BaseButton>
                              )}
                          </>
                        )}
                      </HasAccess>
                    </Col>
                  </Row>
                </Col>

                <Col xs={12}>
                  <Row justify={"center "}>
                    <Col xs={4} className={"text-center mb-24 no-print"}>
                      <Title className={"no-print"} md gray>
                        Transaction’s History Log
                      </Title>
                      <br />
                      <hr />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} className={"no-print"}>
                      <BaseTable
                        tableHeader={["Date and Time", "Account", "Status"]}
                      >
                        {values(get(txnsHistory, "result", [])) &&
                          values(get(txnsHistory, "result", [])).map((item) => (
                            <tr>
                              <td>
                                {moment(get(item, "date")).format("DD.MM.YYYY")}{" "}
                                <br />
                                {moment(get(item, "date")).format("HH:SS A")}
                              </td>
                              <td>{get(item, "fullName", "-")}</td>
                              <td>
                                {isEqual(get(item, "status"), "SUCCESSFUL") ? (<Text small success>{get(item, "status")}</Text>) : (isEqual(get(item, "status"), "REFUNDED") ? (<Text small primary>{get(item, "status")}</Text>) : (isEqual(get(item, "status"), "HOLD") ? (<Text small tangerine>{get(item, "status")}</Text>) : (isEqual(get(item, "status"), "FAILED") ? (<Text small danger>{get(item, "status")}</Text>) : "")))}
                              </td>
                            </tr>
                          ))}
                      </BaseTable>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Content>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col xs={12} className={"text-center"}>
            <ContentLoader />
          </Col>
        </Row>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    entities: get(state, "normalizer.entities", {}),
    txns: get(state, "normalizer.data.get-txns-one.result", null),
    txnsHistory: get(state, "normalizer.data.get-txns-one-history", {}),
    isFetched: get(state, "normalizer.data.get-txns-one.isFetched", false),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTxnsOneDispatch: (id) =>
      dispatch({ type: Actions.GET_TXNS_ONE.REQUEST, payload: { id } }),
    getTxnsStatusCountDispatch: () =>
      dispatch({ type: Actions.GET_TXNS_STATUS_COUNT.REQUEST }),
    getTxnsHistoryDispatch: (id) =>
      dispatch({ type: Actions.GET_TXNS_ONE_HISTORY.REQUEST, payload: { id } }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TxnsDetailContainer));
