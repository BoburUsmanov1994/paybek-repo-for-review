import React, {useEffect, useRef, useState} from 'react';
import BaseBreadcrumb from "../../../components/base-breadcrumb";
import Content from "../../../components/content";
import {Col, Container, Row} from "react-grid-system";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import moment from "moment";
import {connect} from "react-redux";
import {get,isEmpty,isEqual,values} from "lodash";
import BaseButton from "../../../components/base-button";
import BaseTable from "../../../components/base-table";
import BasePagination from "../../../components/base-pagination";
import Text from "../../../components/text";
import {Link} from "react-router-dom";
import BaseSelect from "../../../components/base-select";
import Flex from "../../../components/flex";
import Actions from "../Actions";
import AccountActions from "../../accounts/Actions";
import Normalizer from "../../../services/normalizer";
import ContentLoader from "../../../components/loader/ContentLoader";
import CountryScheme from "../../../schema/CountryScheme";
import BaseDatePicker from "../../../components/base-datepicker";
import {Edit} from "react-feather";
import NotificationScheme from "../../../schema/NotificationScheme";
import UserNotificationCreateForm from "../components/UserNotificationCreateForm";


const UsersNotificationsContainer = ({getNotificationsListDispatch,getCountryListDispatch,entities,notifications,isFetched,countries,totalPages,pageSize,getLangListDispatch,langs}) => {
    const [filter, setFilter] = useState({ searchingField: "",countryId:"",page:0,size:pageSize,language:"en",status:null});
    useEffect(() => {
        getCountryListDispatch();
        getLangListDispatch();
    },[]);
    useEffect(() => {
        getNotificationsListDispatch({...filter});
    }, [filter])

    notifications = Normalizer.Denormalize(notifications,[NotificationScheme],entities);
    countries = Normalizer.Denormalize(countries, [CountryScheme], entities).map(({id, name}) => ({
        value: id,
        label: name
    }));



    const refCountrySelect = useRef();
    const refStatusSelect = useRef();

    const clearCountrySelect = () => {
        refCountrySelect.current.select.clearValue()
    }
    const clearStatusSelect = () => {
        refStatusSelect.current.select.clearValue()
    }

    const clearSelect = () => {
        clearCountrySelect();
        clearStatusSelect();
    }
    langs = values(langs).map(({lang,title}) =>({value:lang,label:title}));
    const status = [{value:"SCHEDULED",label:"SCHEDULED"},{value:"SUCCESSFULLY",label:"SUCCESSFULLY"},{value:"CANCELLED",label:"CANCELLED"}]
    return (
        <Container fluid>
            <Row>
                <Col xs={12} className={'mb-8'}>
                    <BaseBreadcrumb items={[{
                        id: 1,
                        name: 'Users',
                        url: '/users'
                    }, {
                        id: 2,
                        name: 'Push notifications',
                        url: '/users/events'
                    }]}/>
                </Col>
                <Col xs={12}>
                    <Content className={'mb-24'}>
                        <Tabs>
                            <TabList>
                                <Tab>Send</Tab>
                                <Tab>History</Tab>
                            </TabList>

                            <TabPanel className={'p-30'}>
                                <UserNotificationCreateForm countries={countries} langs={langs}/>
                            </TabPanel>
                            <TabPanel className={'p-30'}>
                                <Row align={'center'} className={'mb-16'}>
                                    <Col xs={9}>
                                        <Flex>
                                            <BaseDatePicker placeholder={'From'}/>
                                            <BaseDatePicker placeholder={'Till'} margin={'0 0 0 15px'}/>
                                            <BaseSelect ref={refCountrySelect} handleChange={(values) => setFilter(filter => ({
                                                ...filter,
                                                countryId: get(values, 'value', '')
                                            }))} options={countries} margin={'0 0 0 15px'} width={'200px'}
                                                        placeholder={'Country'}/>
                                            <BaseSelect defaultValue={get(filter,'language','en')} handleChange={(values) => setFilter(filter => ({
                                                ...filter,
                                                language: get(values, 'value', '')
                                            }))} options={langs} margin={'0 0 0 15px'} width={'175px'} placeholder={'Language'}/>
                                            <BaseSelect ref={refStatusSelect} handleChange={(values) => setFilter(filter => ({
                                                ...filter,
                                                status: get(values, 'value', '')
                                            }))} options={status} margin={'0 0 0 15px'} width={'175px'} placeholder={'Status'}/>
                                        </Flex>
                                    </Col>
                                    <Col xs={3} className={'text-right'}>
                                        <BaseButton handleClick={() => {
                                            setFilter(filter => ({...filter, lastActiveDays:0, countryId: ""}));
                                            clearSelect()
                                        }} danger className={'mr-4'}>Reset</BaseButton>
                                    </Col>
                                </Row>
                                <Row className={'mb-32'}>
                                    <Col xs={12}>
                                        {isFetched ?
                                            <BaseTable
                                                tableHeader={['ID', 'Country', 'Language', 'Title','Status','Start date', 'End Date','Deliveries','Opens']}>
                                                {!isEmpty(notifications) ? notifications.map((notification,index) => <tr key={get(notification,'id',null)}>
                                                    <td><Link to={`/users/notifications${
                                                        isEqual(get(notification,'status'),'SUCCESSFULLY') ? '/success/' : isEqual(get(notification,'status'),'SCHEDULED') ?
                                                            '/scheduled/' : '/cancelled/'
                                                    }` + get(notification,'id',null)}>{get(notification,'serialNumber')}</Link></td>
                                                    <td>{get(notification,'country')}</td>
                                                    <td>{get(notification,'language')}</td>
                                                    <td>{get(notification,'title')}</td>
                                                    <td>
                                                        {isEqual(get(notification,'status'),'SUCCESSFULLY') && <Text success>SUCCESSFULLY</Text>}
                                                        {isEqual(get(notification,'status'),'SCHEDULED') && <Text primary>SCHEDULED</Text>}
                                                        {isEqual(get(notification,'status'),'CANCELLED') && <Text danger>CANCELLED</Text>}
                                                    </td>
                                                    <td>{moment(get(notification,'fromTime')).format('DD.MM.YYYY')}</td>
                                                    <td>{moment(get(notification,'tillTime')).format('DD.MM.YYYY')}</td>
                                                    <td>{get(notification,'deliveriesCount')}</td>
                                                    <td>{get(notification,'opensCount')}</td>
                                                </tr>): <tr>
                                                    <td colSpan={9}>No data</td>
                                                </tr>
                                                }
                                            </BaseTable> : <ContentLoader />
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
                                    <Col xs={8}><BasePagination
                                        onChange={({selected}) => setFilter(filter => ({...filter, page: selected}))}
                                        pageCount={totalPages}/></Col>
                                </Row>}
                            </TabPanel>

                        </Tabs>

                    </Content>
                </Col>
            </Row>

        </Container>
    );
};
const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalizer.entities', {}),
        notifications: get(state, 'normalizer.data.notifications-list.result.content', []),
        isFetched: get(state, 'normalizer.data.notifications-list.isFetched', false),
        countries: get(state, 'normalizer.data.country-list.result', []),
        langs: get(state, 'normalizer.data.lang-list.result', {}),
        totalPages: get(state, 'normalizer.data.notifications-list.result.totalPages', 0),
        pageSize: get(state, 'normalizer.data.notifications-list.result.size', 10),
        pageNumber: get(state, 'normalizer.data.notifications-list.result.number', 0),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getNotificationsListDispatch: (params) => dispatch({type: Actions.GET_PUSH_NOTIFICATIONS_LIST.REQUEST, payload: {params}}),
        getCountryListDispatch: () => dispatch({type: AccountActions.GET_COUNTRY_LIST.REQUEST, payload: {params: {}}}),
        getLangListDispatch: () => dispatch({type: Actions.GET_LANG_LIST.REQUEST, payload: {params: {}}})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersNotificationsContainer);




