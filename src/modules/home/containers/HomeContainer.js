import React, {useEffect, useState, useRef} from 'react';
import {ReactSVG} from "react-svg";
import NumberFormat from "react-number-format";
import {connect, useDispatch} from "react-redux";
import {withRouter} from "react-router-dom";
import {Container} from "../../../components/grid";
import {Col, Row} from "react-grid-system";
import Title from "../../../components/title";
import Text from "../../../components/text";
import Content from "../../../components/content";
import {BaseLineChart} from "../../../components/base-chart";
import BaseSelect from "../../../components/base-select";
import Growth from "../../../components/growth";
import BaseButton from "../../../components/base-button";
import BaseProgress from "../../../components/base-progress";
import chevronIcon from "../../../assets/images/icons/chevron.svg";
import checkLightIcon from "../../../assets/images/icons/check-light.svg";
import checkFullIcon from "../../../assets/images/icons/check-full.svg";
import Flex from "../../../components/flex";
import {get, head, includes, isEqual, round} from "lodash";
import Actions from "../Actions";
import TXNSActions from '../../txns/Actions';
import AccountActions from "../../accounts/Actions";
import ContentLoader from "../../../components/loader/ContentLoader";
import HasAccess from "../../../services/auth/HasAccess";
import Normalizer from "../../../services/normalizer";
import CountryScheme from "../../../schema/CountryScheme";
import { months } from 'moment';

const HomeContainer = ({history, user, getDashboardDataDispatch, dashboard, isFetched,getCountryListDispatch,countries,entities}) => {
    countries = Normalizer.Denormalize(countries, [CountryScheme], entities).map(({id, name}) => ({
        value: id,
        label: name
    }));
    
    // const dispatch = useDispatch();
    // useEffect(() => {
    //   dispatch({type: TXNSActions.SET_OLD_PAGINATION_PAGE, payload: false})
    // }, []);
    
    const listOfCountryData = get(dashboard,'topUpVolumes', []).map(item => get(item, "values", [])).map(item => item.map(item => item.country));
    const listOfCountryDataFromBack = [];

    listOfCountryData.forEach((item) => {
        for(let i = 0; i < item.length; i++) {
            if(!listOfCountryDataFromBack.includes(item[i]) && item[i] !== null) {
                listOfCountryDataFromBack.push(item[i])
            }
        }
    });

    const [selectedCountries, setSelectedCountries] = useState([]);
    const [lines, setLines] = useState([]);

    const [filter, setFilter] = useState({
        type: 'month',
        dateNumber: 2, // to select period 
        gettingTypeNumber: 1 // to select volume or number of transactios 
    });

    useEffect(() => {
        setLines(selectedCountries.map(({ label }) => label));
    }, [selectedCountries])

    useEffect(() => {
        getCountryListDispatch();
        
    }, []);

    useEffect(() => {
        getDashboardDataDispatch(filter);
    }, [filter]);

    const handleChangePeriodType = ({value}) => {
        setFilter({
            ...filter,
            type: value,
            dateNumber: '',
        })
    }

    const handleChangePeriod = ({value}) => {

        setFilter({
            ...filter,
            dateNumber: value,
            type: 'month'
        });
    }

    const handleChangeValTran = ({value}) => {
        setFilter({
            ...filter,
            gettingTypeNumber: value
        })
    }

    const sortYearOrMonth = (filter.type == "month") ? get(dashboard, 'topUpVolumes', []).map(item => item.month ? {...item, month: item.month.slice(0, 3)} : item) : get(dashboard, 'topUpVolumes', []).sort((a, b) => a.year - b.year);

    // get(head(get(dashboard,'topUpVolumes',{})),'values',[]).map(({country}) => country)
    useEffect(() => {
        setLines(listOfCountryDataFromBack);
    },[dashboard]);

      

    return (
        <>{isFetched ?
            <Container width={'80%'}>
                <Row className={'mb-24'}>
                    <Col xs={12}>
                        <Title padding={'0 0 0 25px'}>Dashboard</Title>
                        <Text padding={'0 0 0 25px'} gray>Good to see you again, {get(user, 'firstName', '')}</Text>
                    </Col>
                </Row>
                <Row className={'mb-24'}>
                    <Col xs={12}>
                        <Content rounded>
                            <Row>
                                <Col xs = {12}>
                                    <Row className={'mb-16 ml-4'}>
                                        <Text xl dark medium>Top-up Volume </Text>
                                    </Row>
                                    
                                </Col>
                            </Row>
                            <Row gutterWidth={60} className={'mb-16'}>
                                <Col xs = {7}>
                                    <BaseSelect
                                    // countries.filter(country => includes(get(head(get(dashboard, 'topUpVolumes')), 'values').map(({country}) => country), get(country, 'label')))
                                    defaultValue={countries.filter(country => includes(listOfCountryDataFromBack, get(country, 'label')))}
                                    handleChange={(item) => setSelectedCountries(item)} width={'90%'}
                                    placeholder={'Choose countries '} 
                                    options={countries}
                                    isMulti
                                    isSearchable = 'true'

                                    />
                                </Col>
                                <Col xs = {5}>
                                    <Flex>
                                    <BaseSelect
                                    margin={'0 0 0 8px'}
                                    width={'220px'}
                                    defaultValue={filter.dateNumber}
                                    options={[
                                        {value: 1, label: 'Last 30 days'},
                                        {value: 2, label: 'Last 3 months'},
                                        {value: 3, label: 'Last 6 months'},
                                        {value: 4, label: 'Last 12 months'},

                                    ]}
                                    placeholder={'Select'}
                                    handleChange={handleChangePeriod}/>

                                    <BaseSelect
                                    margin={'0 0 0 8px'}
                                    width={'150px'}
                                    defaultValue={filter.type}
                                    options={[
                                        {value: 'month', label: 'Month'}, 
                                        {value: 'year', label: 'Year'}
                                    ]}
                                    placeholder={'Select Transactions Number'}
                                    handleChange={handleChangePeriodType}/>

                                    <BaseSelect
                                        margin={'0 0 0 8px'}
                                        width={'220px'}
                                        defaultValue={filter.gettingTypeNumber}
                                        options={[
                                            {value: 2, label: 'Volume'}, 
                                            {value: 1, label: 'Amount transactions'}
                                        ]}
                                        placeholder={'Select Transactions Number'}
                                        handleChange={handleChangeValTran}/>
                                    </Flex>

                                </Col>
                            </Row>
                            <Row>
                                <Col xs={10}>
                                    <Row>
                                        <Col xs={12}>
                                            <BaseLineChart
                                                lines={lines}
                                                // get(dashboard, 'topUpVolumes', [])
                                                data={sortYearOrMonth}
                                                date={filter.type}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={2}>
                                    <Row className={'mt-48'}>
                                        <Col xs={12}>
                                            <Title margin={'0 0 15px'}>$<NumberFormat displayType={'text'}
                                                                                        thousandSeparator={','}
                                                                                        value={round(get(dashboard, 'amountTopUps', 0), 2)}/></Title>
                                        </Col>
                                    </Row>
                                    <Row className={'mb-24'}>
                                        <Col xs={12}>
                                            <Flex><Text gray margin={'0 8px 0px 0'}>Top-ups this
                                                month</Text><Growth
                                                increase={get(dashboard, 'up', false)} decrease={!get(dashboard, 'up', false) && get(dashboard, 'amountTopUpsPercent', 0) != 0}>{round(get(dashboard, 'amountTopUpsPercent', 0), 2)}%</Growth></Flex>
                                        </Col>
                                    </Row>
                                    <Row className={'mb-48'}>
                                        <Col xs={12}>
                                            <BaseButton outlined dark handleClick={() => history.push('/txns')}>All
                                                top-up Summary</BaseButton>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <Title margin={'0 0 8px 0'}>{get(dashboard, 'allCountryCount', 0)}</Title>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <BaseButton outlined dark handleClick={() => history.push('/txns')}>All
                                                Countries</BaseButton>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                    </Content>
                </Col>
            </Row>

            <Row>
                <Col xs={6}>
                    <Content rounded>
                        <Row align={'center'} className={'mb-16'}>
                            <Col xs={6}><Text xl dark medium>Users</Text></Col>
                            <Col xs={6} className={'text-right'}>
                                <HasAccess>
                                    {({userCan,permissions}) => userCan(permissions,'GET_STAFF_LIST') && <BaseButton outlined dark handleClick={() => history.push('/users')}>All
                                            Users
                                            Data</BaseButton>
                                    }
                                </HasAccess>
                            </Col>
                        </Row>
                        <Row className={'mb-24'}>
                            <Col xs={6}>
                                <Title><NumberFormat displayType={'text'} thousandSeparator={','}
                                                        value={round(get(dashboard, 'userData.activeUsersCount', 0), 2)}/></Title>
                                <Text gray>Active Users</Text>
                            </Col>
                            <Col xs={6}>
                                <Title><NumberFormat displayType={'text'} thousandSeparator={','}
                                                        value={round(get(dashboard, 'userData.inActiveUsersCount', 0), 2)}/></Title>
                                <Text gray>Inactive Users</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <Title><NumberFormat displayType={'text'} thousandSeparator={','}
                                                        value={round(get(dashboard, 'userData.newDailyUserCount', 0), 2)}/></Title>
                                <Text gray>New Users (Daily)</Text>
                            </Col>
                            <Col xs={6}>
                                <Title><NumberFormat displayType={'text'} thousandSeparator={','}
                                                        value={round(get(dashboard, 'userData.newMonthlyUserCount', 0), 2)}/></Title>
                                <Text gray>New Users (Monthly)</Text>
                            </Col>
                        </Row>
                    </Content>
                </Col>
                <Col xs={6}>
                    <Content rounded>
                        <Row align={'center'} className={'mb-16'}>
                            <Col xs={8}> <Text xl dark medium>Last Sent Push Notifications</Text></Col>
                            <Col xs={4} className={'text-right'}><HasAccess>
                                {({userCan,permissions}) => userCan(permissions,'GET_NOTIFICATION_LIST') && <BaseButton
                                    handleClick={() => history.push('/users/notifications')}
                                    outlined dark width={'80px'}>See All</BaseButton>
                                }</HasAccess></Col>

                        </Row>
                        {get(dashboard, 'notificationData', []).map((notification, index) => <div key={index}><Row
                            align={'center'}>
                            <Col xs={2}>
                                <Flex justify={'center'}>
                                    <BaseProgress percentage={get(notification, 'openedPercent', 0)}/>
                                </Flex>
                            </Col>
                            <Col xs={10}>
                                <Flex className={'mb-8'}>
                                    <ReactSVG src={chevronIcon}
                                                className={'check-icon arrow'}/><Text
                                    gray> {get(notification, 'title', '')}</Text>
                                </Flex>
                                <Flex className={'mb-8'}><ReactSVG className={'check-icon'}
                                                                    src={checkLightIcon}/><Text
                                    gray> Delivered: <NumberFormat displayType={'text'} thousandSeparator={','}
                                                                    value={round(get(notification, 'deliveredCount', 0), 2)}/></Text></Flex>
                                <Flex><ReactSVG className={'check-icon'} src={checkFullIcon}/><Text
                                    gray> Opened: <NumberFormat displayType={'text'} thousandSeparator={','}
                                                                value={round(get(notification, 'openedCount', 0), 2)}/></Text></Flex>
                            </Col>
                        </Row>
                            {!isEqual(index + 1, get(dashboard, 'notificationData', []).length) &&
                            <Row className={'mt-24 mb-24'}>
                                <Col xs={12}>
                                    <hr className={'horizontal-line'}/>
                                </Col>
                            </Row>}
                        </div>)

                        }

                    </Content>
                </Col>

            </Row>
        </Container> : <ContentLoader height={'80vh'}/>
    }
    </>
    );
}
;
const mapStateToProps = (state) =>
{
    return {
        entities: get(state, 'normalizer.entities', {}),
        user: get(state, 'auth.user', {}),
        dashboard: get(state, 'normalizer.data.dashboard-data.result', {}),
        isFetched: get(state, 'normalizer.data.dashboard-data.isFetched', false),
        countries: get(state, 'normalizer.data.country-list.result', []),
        defaultValuLine: get(state, 'dashboard', []),
        defaultValueCountry: get(state, )
    }
}
const mapDispatchToProps = (dispatch) =>
{
    return {
        getDashboardDataDispatch: ({type, dateNumber, gettingTypeNumber }) => dispatch({type: Actions.GET_DASHBOARD_DATA.REQUEST, payload: {type, dateNumber, gettingTypeNumber}}),
        getCountryListDispatch: () => dispatch({type: AccountActions.GET_COUNTRY_LIST.REQUEST, payload: {params: {}}}),
        sendDefaultValueDashboardLine: (data) => dispatch({type: "SAVE_GRAFIC_DEFAULT_DATA", payload: data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeContainer));
