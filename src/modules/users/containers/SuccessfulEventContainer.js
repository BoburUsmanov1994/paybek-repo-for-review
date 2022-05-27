import React, {useEffect, useState} from 'react';
import {get, round, values} from "lodash";
import {Col, Container, Row} from "react-grid-system";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import BaseBreadcrumb from "../../../components/base-breadcrumb";
import Content from "../../../components/content";
import Actions from "../Actions";
import Normalizer from "../../../services/normalizer";
import Flex from "../../../components/flex";
import Title from "../../../components/title";
import Text from "../../../components/text";
import moment from "moment";
import Loader from "../../../components/loader";
import BaseTable from "../../../components/base-table";
import ContentLoader from "../../../components/loader/ContentLoader";
import EventScheme from "../../../schema/EventScheme";
import BaseProgress from "../../../components/base-progress";
import {ReactSVG} from "react-svg";
import checkLightIcon from "../../../assets/images/icons/check-light.svg";
import NumberFormat from "react-number-format";
import checkFullIcon from "../../../assets/images/icons/check-full.svg";


const SuccessfulEventContainer = ({
                                      history,
                                      id,
                                      entities,
                                      event,
                                      isFetched,
                                      getEventOneDispatch,
                                  }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getEventOneDispatch(id);
    }, []);
    event = Normalizer.Denormalize(event, EventScheme, entities);

    return (
        <Container fluid>
            <Row>
                <Col xs={12}>
                    {loading && <Loader/>}
                </Col>
                <Col xs={12} className={'mb-8'}>
                    <BaseBreadcrumb items={[{id: 1, name: 'Users', url: '/users'}, {
                        id: 2,
                        name: 'Events',
                        url: '/users/events'
                    }, {id: 3, name: 'Successful', url: '/users/events/success'}]}/>
                </Col>
                <Col xs={12} className={'mb-32'}>
                    <Content className={'p-50'}>
                        {isFetched ? <Row>
                           <Col className={'mb-48'} xs={8}>
                                <Row>
                                    <Col xs={6}>
                                        <Flex justify={'space-between'}>
                                            <Title sm className={'mr-16'}>
                                                Country
                                            </Title>
                                            <Text>
                                                {get(event, 'country', '-')}
                                            </Text>
                                        </Flex>
                                        <hr className={'my-16'}/>
                                    </Col>
                                </Row>
                               <Row>
                                   <Col xs={6}>
                                       <Flex justify={'space-between'}>
                                           <Title sm className={'mr-16'}>
                                               Language
                                           </Title>
                                           <Text>
                                               {get(event, 'language', '-')}
                                           </Text>
                                       </Flex>
                                       <hr className={'my-16'}/>
                                   </Col>
                               </Row>
                               <Row align={'center'}>
                                   <Col xs={6}>
                                       <Row align={'center'}>
                                           <Col xs={12}>
                                               <Flex justify={'space-between'}>
                                                   <Title sm className={'mr-16'}>
                                                       Title
                                                   </Title>
                                                   <Text>
                                                       {get(event, 'title', '-')}
                                                   </Text>
                                               </Flex>
                                               <hr className={'my-16'}/>
                                           </Col>
                                           <Col xs={12}>
                                               <Flex justify={'space-between'}>
                                                   <Title sm className={'mr-16'}>
                                                       Message
                                                   </Title>
                                                   <Text>
                                                       {get(event, 'text', '-')}
                                                   </Text>
                                               </Flex>
                                               <hr className={'my-16'}/>
                                           </Col>
                                       </Row>
                                   </Col>
                                   <Col xs={6}>
                                       <Row
                                           align={'center'} >
                                           <Col xs={2} offset={{xs:2}}>
                                               <Flex justify={'center'} className={'mt-16'}>
                                                   <BaseProgress percentage={get(event, 'openedPercent', 0)}/>
                                               </Flex>
                                           </Col>
                                           <Col xs={8}>
                                               <Flex className={'mb-8'}><ReactSVG className={'check-icon'}
                                                                                  src={checkLightIcon}/><Text
                                                   gray> Delivered: <NumberFormat displayType={'text'}
                                                                                  thousandSeparator={','}
                                                                                  value={round(get(event, 'deliveredCount', 0), 2)}/></Text></Flex>
                                               <Flex><ReactSVG className={'check-icon'} src={checkFullIcon}/><Text
                                                   gray> Opened: <NumberFormat displayType={'text'}
                                                                               thousandSeparator={','}
                                                                               value={round(get(event, 'openedCount', 0), 2)}/></Text></Flex>
                                           </Col>
                                       </Row>
                                   </Col>
                               </Row>
                               <Row>
                                   <Col xs={6}>
                                       <Flex justify={'space-between'}>
                                           <Title sm className={'mr-16'}>
                                               Banner
                                           </Title>
                                           <img src={get(event, 'photoUrl', '-')}  className={'img-fluid'} alt="Banner"/>
                                       </Flex>
                                       <hr className={'my-16'}/>
                                   </Col>
                               </Row>
                               <Row>
                                   <Col xs={6}>
                                       <Flex justify={'space-between'}>
                                           <Title sm className={'mr-16'}>
                                               Started date and time
                                           </Title>
                                           <Text>
                                               {moment(get(event, 'fromTime')).format('DD.MM.YYYY HH:SS A')}
                                           </Text>
                                       </Flex>
                                       <hr className={'my-16'}/>
                                   </Col>
                               </Row>
                               <Row>
                                   <Col xs={6}>
                                       <Flex justify={'space-between'}>
                                           <Title sm className={'mr-16'}>
                                               Ended date and time
                                           </Title>
                                           <Text>
                                               {moment(get(event, 'tillTime')).format('DD.MM.YYYY HH:SS A')}
                                           </Text>
                                       </Flex>
                                       <hr className={'my-16'}/>
                                   </Col>
                               </Row>
                           </Col>
                            <Col xs={12}>
                                <Row>
                                    <Col xs={12} className={'text-center mb-24'}>
                                        <Title md gray>Event’s History Log</Title>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <BaseTable tableHeader={['Date and Time', 'Account', 'Status']}>
                                            {
                                                values(get(event, 'eventHistories', [])) && get(event, 'eventHistories', []).map((item) =>
                                                    <tr key={get(item, 'dateAndTime')}>
                                                        <td>{moment(get(item, 'dateAndTime')).format('DD.MM.YYYY HH:SS A')}</td>
                                                        <td>{get(item, 'account', '-')}</td>
                                                        <td>{get(item, 'status', '-')}</td>
                                                    </tr>)
                                            }
                                        </BaseTable>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>:<Row><Col xs={12} className={'text-center'}><ContentLoader /></Col></Row>}
                    </Content>
                </Col>
            </Row>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalizer.entities', {}),
        event: get(state, 'normalizer.data.get-one-event.result', {}),
        isFetched: get(state, 'normalizer.data.get-one-event.isFetched', false),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getEventOneDispatch: (id) => dispatch({type: Actions.GET_ONE_EVENT.REQUEST, payload: {id}}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SuccessfulEventContainer));

