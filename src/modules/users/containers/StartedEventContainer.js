import React, {useEffect, useState} from 'react';
import {get, values} from "lodash";
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


const StartedEventContainer = ({
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

    const cancelEvent = () => {

    }

    return (
        <Container fluid>
            <Row>
                <Col xs={12}>
                    {loading && <Loader/>}
                </Col>
                <Col xs={12} className={'mb-8'}>
                    <BaseBreadcrumb items={[{id: 1, name: 'Users', url: '/users'},{id: 1, name: 'Events', url: '/users/events'},{id: 1, name: 'Started', url: '/users/events/started'}]}/>
                </Col>
                <Col xs={12} className={'mb-32'}>
                    <Content className={'p-50'}>
                        {isFetched ? <Row>
                            <Col className={'mb-48'} xs={8}>
                                <Row>
                                    <Col xs={6}>
                                        <Flex justify={'space-between'}>
                                            <Title sm className={'mr-4'}>
                                                Opened Date
                                            </Title>
                                            <Text>
                                                {moment(get(event, 'date')).format('DD.MM.YYYY HH:SS A')}
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
                                                values(get(event, 'result', [])) && get(event, 'result', []).map((item) =>
                                                    <tr>
                                                        <td>{moment(get(item, 'date')).format('DD.MM.YYYY HH:SS A')}</td>
                                                        <td>{get(item, 'fullName', '-')}</td>
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
        event: get(state, 'normalizer.data.get-event-one.result', {}),
        isFetched: get(state, 'normalizer.data.get-event-one.isFetched', false),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getEventOneDispatch: (id) => dispatch({type: Actions.GET_ONE_EVENT, payload: {id}}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StartedEventContainer));

