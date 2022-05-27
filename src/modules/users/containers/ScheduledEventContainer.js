import React, {useEffect, useState} from 'react';
import {get, values} from "lodash";
import {Col, Container, Row} from "react-grid-system";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import BaseBreadcrumb from "../../../components/base-breadcrumb";
import Content from "../../../components/content";
import Actions from "../Actions";
import Normalizer from "../../../services/normalizer";
import Loader from "../../../components/loader";
import EventScheme from "../../../schema/EventScheme";
import AccountActions from "../../accounts/Actions";
import ContentLoader from "../../../components/loader/ContentLoader";
import UserEventEditForm from "../components/UserEventEditForm";
import CountryScheme from "../../../schema/CountryScheme";
import ApiService from "../ApiService";
import {toast} from "react-toastify";


const ScheduledEventContainer = ({
                                     history,
                                     id,
                                     entities,
                                     event,
                                     isFetched,
                                     getEventOneDispatch,
                                     getCountryListDispatch,
                                     getLangListDispatch,
                                     countries,
                                     langs
                                 }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getEventOneDispatch(id);
        getCountryListDispatch();
        getLangListDispatch();
    }, []);
    event = Normalizer.Denormalize(event, EventScheme, entities);
    countries = Normalizer.Denormalize(countries, [CountryScheme], entities).map(({id, name}) => ({
        value: id,
        label: name
    }));
    langs = values(langs).map(({lang,title}) =>({value:lang,label:title}));

    const cancelEvent = () => {
        setLoading(true);
        ApiService.CancelScheduledEvent(id).then((res) => {
            if(res && res.data){
                setLoading(false);
                toast.success('Success');
                history.push('/users/events')
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

    const editAndSaveEvent = (data) => {
        setLoading(true);
        ApiService.EditOrSaveEvent({id,...data}).then((res) => {
            if(res && res.data){
                setLoading(false);
                toast.success('Success');
                history.push('/users/events')
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
            {isFetched ? <Row>
                <Col xs={12}>
                    {loading && <Loader/>}
                </Col>
                <Col xs={12} className={'mb-8'}>
                    <BaseBreadcrumb items={[{id: 1, name: 'Users', url: '/users'}, {
                        id: 2,
                        name: 'Events',
                        url: '/users/events'
                    }, {id: 3, name: 'Scheduled', url: '/users/events/scheduled'}]}/>
                </Col>
                <Col xs={12} className={'mb-32'}>
                    <Content className={'p-50'}>
                        <Row>
                            <Col xs={12}>
                                <UserEventEditForm event={event} countries={countries} langs={langs} editAndSaveEvent={editAndSaveEvent} cancelEvent={cancelEvent} />
                            </Col>
                        </Row>
                    </Content>
                </Col>
            </Row>:<Row>
                <Col xs={12}>
                    <ContentLoader event={event} />
                </Col>
            </Row>}
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalizer.entities', {}),
        event: get(state, 'normalizer.data.get-one-event.result', {}),
        countries: get(state, 'normalizer.data.country-list.result', []),
        langs: get(state, 'normalizer.data.lang-list.result', {}),
        isFetched: get(state, 'normalizer.data.get-one-event.isFetched', false),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getEventOneDispatch: (id) => dispatch({type: Actions.GET_ONE_EVENT.REQUEST, payload: {id}}),
        getCountryListDispatch: () => dispatch({type: AccountActions.GET_COUNTRY_LIST.REQUEST, payload: {params: {}}}),
        getLangListDispatch: () => dispatch({type: Actions.GET_LANG_LIST.REQUEST, payload: {params: {}}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ScheduledEventContainer));



