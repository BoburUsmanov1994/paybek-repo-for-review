import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import BaseBreadcrumb from "../../../components/base-breadcrumb";
import {isPossiblePhoneNumber, formatPhoneNumberIntl} from 'react-phone-number-input';
import Content from "../../../components/content";
import {Col, Container, Row} from "react-grid-system";
import BaseButton from "../../../components/base-button";
import Text from "../../../components/text";
import Avatar from "../../../components/avatar";
import Title from "../../../components/title";
import Flex from "../../../components/flex";
import {get, isEmpty, isEqual, round, includes} from "lodash";
import Actions from "../Actions";
import NumberFormat from "react-number-format";
import BaseTable from "../../../components/base-table";
import {Link} from "react-router-dom";
import moment from "moment";
import {ReactSVG} from "react-svg";
import completedIcon from "../../../assets/images/icons/completed.svg";
import holdIcon from "../../../assets/images/icons/paused.svg";
import failedIcon from "../../../assets/images/icons/failed.svg";
import refundedIcon from "../../../assets/images/icons/refunded.svg";
import ContentLoader from "../../../components/loader/ContentLoader";
import Normalizer from "../../../services/normalizer";
import TxnsScheme from "../../../schema/TxnsScheme";
import BaseSelect from "../../../components/base-select";
import BasePagination from "../../../components/base-pagination";
import ApiService from "../ApiService";
import Loader from "../../../components/loader";
import {toast} from "react-toastify";
import {saveFile} from "../../../utils";
import NormalizerActions from "../../../services/normalizer/actions";

const UsersDetailContainer = ({
                                  userId = null,
                                  getClientOneDispatch,
                                  getClientReportDispatch,
                                  report,
                                  isFetched,
                                  client,
                                  entities,
                                  totalPages,
                                  pageSize,
                                  pageNumber,
                                  setTriggerListDispatch,
                                  isFetchedReport,
                                  setTriggerDispatch
                              }) => {
    const [filter, setFilter] = useState({userId, size: pageSize, page: pageNumber});
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: Actions.SET_INITIAL_USERS_PAGINATION_PAGE, payload: true})
    }, [])


    useEffect(() => {
        setTriggerDispatch();
        getClientReportDispatch(userId);
    }, []);

    useEffect(() => {
        setTriggerListDispatch();
        getClientOneDispatch(filter);
    }, [filter]);
    
    client = Normalizer.Denormalize(client, [TxnsScheme], entities);

    const changeClientStatus = () => {
        setLoading(true);
        ApiService.ChangeClientStatus(userId).then((res) =>{
            if(res && res.data){
                setLoading(false);
                toast.success('Success');
                getClientReportDispatch(userId);
            }
        }).catch((e) => {
            setLoading(false);
            if (e.response.data && e.response.data.errors) {
                e.response.data.errors.map(({errorMsg}) => toast.error(`${errorMsg}`));
                return
            }
            toast.error('ERROR')
        })
    }

    const downloadExcelFile = () => {
        setLoading(true);
        ApiService.DownloadUserExcelFile(userId).then((res) => {
            if(res && res.data){
                setLoading(false);
                saveFile(res,moment(),'xlsx');
            }
        }).catch((e) => {
            setLoading(false);
            if (e.response.data && e.response.data.errors) {
                e.response.data.errors.map(({errorMsg}) => toast.error(`${errorMsg}`));
                return
            }
            toast.error('ERROR')
        })
    }
    
    return (
        <Container fluid>
            <Row>
                <Col xs={12}>
                    {loading && <Loader/>}
                </Col>
                <Col xs={12}>
                    <BaseBreadcrumb items={[{
                        id: 1,
                        name: 'Users',
                        url: '/users'
                    }, {
                        id: 2,
                        name: 'User Info',
                        url: '/users/detail/'
                    }]}/>
                </Col>
            </Row>
            <Row>
                <Col xs={12} className={'mb-24'}>
                    <Content>
                        {isFetchedReport ?
                            <>
                                <Row className={'mb-24'}>
                                    <Col xs={6}>
                                        <Flex>
                                            <Avatar logo={get(report, 'countryFlagUrl', null)}/> 
                                            <Title margin={'0 0 0 25px'}>
                                                {get(report, 'phoneNumber', '') ? formatPhoneNumberIntl(includes(get(report, "phoneNumber", "-"), 'T') ? get(report, "phoneNumber", "-").split('-')[0] : (includes(get(report, "phoneNumber", "-"), '-') ? get(report, "phoneNumber", "-").split('-')[0] : get(report, "phoneNumber", "-"))) : '-'}
                                            </Title>
                                            <Title margin={'0 0 0 25px'}>Device OS: {get(report, "deviceType", "-")}</Title>
                                        </Flex>
                                    </Col>
                                    <Col xs={6} className={'text-right'}>
                                        <Flex justify={'flex-end'}>
                                            <BaseButton className={'mr-16'} default
                                                        handleClick={() => downloadExcelFile()}>Save as
                                                Excel</BaseButton>
                                            {!get(report, 'active', false) ? <BaseButton className={'mr-16'} success
                                                                                         handleClick={() => changeClientStatus()}>Unblock
                                                    User</BaseButton> :
                                                <BaseButton className={'mr-16'} handleClick={() => changeClientStatus()}
                                                            danger>Block User</BaseButton>}
                                            <Flex column>
                                                <Text gray>Sign-up Date</Text>
                                                <Text medium xl>{moment(get(report,'signUpdate')).format('DD.MM.YYYY')}</Text>
                                            </Flex>
                                        </Flex>
                                    </Col>
                                    <Col>
                                        <hr className={'mt-24'}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <Row>
                                            <Col xs={12}>
                                                <Flex>
                                                    <Flex className={'mr-24'}>
                                                        <Text large className={'mr-16'}>Total TXNs:</Text>
                                                        <Title md><NumberFormat
                                                            displayType={'text'}
                                                            thousandSeparator={','}
                                                            value={round(get(report, 'txnCount', 0), 2)}/></Title>
                                                    </Flex>
                                                    <Flex className={'mr-24'}>
                                                        <Text large className={'mr-16'}>Successful:</Text>
                                                        <Title md><NumberFormat
                                                            displayType={'text'}
                                                            thousandSeparator={','}
                                                            value={round(get(report, 'successful', 0), 2)}/></Title>
                                                    </Flex>
                                                    <Flex className={'mr-24'}>
                                                        <Text large className={'mr-16'}>On hold:</Text>
                                                        <Title md> <NumberFormat
                                                            displayType={'text'}
                                                            thousandSeparator={','}
                                                            value={round(get(report, 'hold', 0), 2)}/></Title>
                                                    </Flex>
                                                    <Flex className={'mr-24'}>
                                                        <Text large className={'mr-16'}>Refunded:</Text>
                                                        <Title md> <NumberFormat
                                                            displayType={'text'}
                                                            thousandSeparator={','}
                                                            value={round(get(report, 'refunded', 0), 2)}/></Title>
                                                    </Flex>
                                                    <Flex className={'mr-24'}>
                                                        <Text large className={'mr-16'}>Failed:</Text>
                                                        <Title md> <NumberFormat
                                                            displayType={'text'}
                                                            thousandSeparator={','}
                                                            value={round(get(report, 'failed', 0), 2)}/></Title>
                                                    </Flex>
                                                    <Flex>
                                                        <Text large className={'mr-16'}>Total amount Sent:</Text>
                                                        <Title md>$ <NumberFormat
                                                            displayType={'text'}
                                                            thousandSeparator={','}
                                                            value={round(get(report, 'summ', 0), 2)}/></Title>
                                                    </Flex>
                                                </Flex>
                                            </Col>
                                            <Col xs={12} className={'mt-24'}>
                                                <hr/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className={'mt-24'}>
                                    <Col xs={12} className={'text-center mb-16'}>
                                        <Title md gray>Transaction History</Title>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} className={'mb-32'}>
                                        {isFetched ?
                                            <BaseTable
                                                tableHeader={['TXN Number', 'Country Code', 'Sender', 'Payment Method', 'WD Amount', 'Amount Sent USD', 'Received', 'USD to Receive rate','USD to PG rate','Rec Number','Date','Status',]}>
                                                {!isEmpty(client) ? client.map((item, index) => <tr key={get(item, 'id', null)}>
                                                    <td><Link to={'/txns/detail/'+get(item, 'id', null)}>{get(item, 'txnNumber', 0)}</Link></td>
                                                    <td>{get(item, 'countryCode', '-')}</td>
                                                    <td className={"minWidth-tdPhone"}>
                                                        {get(item, "sender", "") ? formatPhoneNumberIntl(includes(get(item, "sender", "-"), 'T') ? get(item, "sender", "-").split('-')[0] : (includes(get(item, "sender", "-"), '-') ? get(item, "sender", "-").split('-')[0] : get(item, "sender", "-"))) : '-'}
                                                    </td>
                                                    <td>
                                                        {get(item, 'paymentMethod', '-')}
                                                        <br/>
                                                        ...{get(item, "last4", '')}
                                                    
                                                    </td>
                                                    <td><NumberFormat displayType={'text'}
                                                                      thousandSeparator={','}
                                                                      value={round(get(item, 'wdAmount', 0), 2)}/></td>
                                                    <td><NumberFormat displayType={'text'}
                                                                      thousandSeparator={','}
                                                                      value={round(get(item, 'amountUsd', ''), 2)}/></td>
                                                    <td><NumberFormat displayType={'text'}
                                                                      thousandSeparator={','}
                                                                      value={round(get(item, 'receive', ''), 2)}/></td>
                                                    <td><NumberFormat displayType={'text'}
                                                                      thousandSeparator={','}
                                                                      value={round(get(item, 'usdReceiveRate'), 4)}/></td>
                                                    <td><NumberFormat displayType={'text'}
                                                                      thousandSeparator={','}
                                                                      value={round(get(item, 'usdRate'), 4)}/></td>
                                                    <td className={"minWidth-tdPhone"}>{get(item, "phoneNumber", "") ? formatPhoneNumberIntl(includes(get(item, "phoneNumber", "-"), 'T') ? get(item, "phoneNumber", "-").split('-')[0] : (includes(get(item, "phoneNumber", "-"), '-') ? get(item, "phoneNumber", "-").split('-')[0] : get(item, "phoneNumber", "-"))) : '-'}</td>
                                                    <td>{moment(get(item, 'date')).format('DD.MM.YYYY hh:mm A')}</td>
                                                    <td>
                                                        {isEqual(get(item, 'status', 'ALL'), 'SUCCESSFUL') &&
                                                        <ReactSVG src={completedIcon}/>}
                                                        {isEqual(get(item, 'status', 'ALL'), 'HOLD') &&
                                                        <ReactSVG src={holdIcon}/>}
                                                        {isEqual(get(item, 'status', 'ALL'), 'FAILED') &&
                                                        <ReactSVG src={failedIcon}/>}
                                                        {isEqual(get(item, 'status', 'ALL'), 'REFUNDED') &&
                                                        <ReactSVG src={refundedIcon}/>}
                                                    </td>
                                                </tr>) : <tr>
                                                    <td colSpan={12}>No data</td>
                                                </tr>
                                                }
                                            </BaseTable> : <ContentLoader/>
                                        }
                                    </Col>
                                </Row>
                                {(totalPages > 0) && <Row align={'center'}>
                                    <Col xs={4}>
                                        <Flex>
                                            <Text>Show</Text><BaseSelect
                                            disabled
                                            handleChange={({value}) => setFilter(filter => ({...filter, size: value}))}
                                            defaultValue={pageSize} options={[{value: 5, label: 5}, {value: 10, label: 10}, {
                                            value: 25,
                                            label: 25
                                        }, {value: 50, label: 50}]} margin={'0 12px 0 12px'} width={'80px'}
                                            placeholder={'Count'}/><Text>on the page</Text>
                                        </Flex>
                                    </Col>
                                    <Col xs={8}><BasePagination current={pageNumber}
                                                                onChange={({selected}) => setFilter(filter => ({
                                                                    ...filter,
                                                                    page: selected
                                                                }))}
                                                                pageCount={totalPages}/></Col>
                                </Row>}
                            </> : <ContentLoader/>}
                    </Content>
                </Col>
            </Row>
        </Container>
    );
};
const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalizer.entities', {}),
        client: get(state, 'normalizer.data.get-client-one.result.content', []),
        report: get(state, 'normalizer.data.get-client-report.result', {}),
        isFetchedReport: get(state, 'normalizer.data.get-client-report.isFetched', false),
        isFetched: get(state, 'normalizer.data.get-client-one.isFetched', false),
        totalPages: get(state, 'normalizer.data.get-client-one.result.totalPages', 0),
        pageSize: get(state, 'normalizer.data.get-client-one.result.size', 10),
        pageNumber: get(state, 'normalizer.data.get-client-one.result.number', 0),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getClientOneDispatch: (params) => dispatch({type: Actions.GET_USER.REQUEST, payload: {params}}),
        getClientReportDispatch: (userId) => dispatch({type: Actions.GET_USER_REPORT.REQUEST, payload: {userId}}),
        setTriggerListDispatch: () => dispatch({
            type: NormalizerActions.NORMALIZE.TRIGGER,
            payload: {storeName: 'get-client-one'}
        }),
        setTriggerDispatch: () => dispatch({
            type: NormalizerActions.NORMALIZE.TRIGGER,
            payload: {storeName: 'get-client-report'}
        }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersDetailContainer);
