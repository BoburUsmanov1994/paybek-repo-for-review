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
import AccountActions from "../../accounts/Actions";
import ContentLoader from "../../../components/loader/ContentLoader";
import CountryScheme from "../../../schema/CountryScheme";
import ApiService from "../ApiService";
import {toast} from "react-toastify";
import NotificationScheme from "../../../schema/NotificationScheme";
import UserNotificationEditForm from "../components/UserNotificationEditForm";


const ScheduledNotificationContainer = ({
                                            history,
                                            id,
                                            entities,
                                            notification,
                                            isFetched,
                                            getNotificationOneDispatch,
                                            getCountryListDispatch,
                                            getLangListDispatch,
                                            countries,
                                            langs
                                        }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getNotificationOneDispatch(id);
        getCountryListDispatch();
        getLangListDispatch();
    }, []);
    notification = Normalizer.Denormalize(notification, NotificationScheme, entities);
    countries = Normalizer.Denormalize(countries, [CountryScheme], entities).map(({id, name}) => ({
        value: id,
        label: name
    }));
    langs = values(langs).map(({lang, title}) => ({value: lang, label: title}));

    const cancelNotification = () => {
        setLoading(true);
        ApiService.CancelScheduledNotification(id).then((res) => {
            if (res && res.data) {
                setLoading(false);
                toast.success('Success');
                history.push('/users/notifications')
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

    const editAndSaveNotification = (data) => {
        setLoading(true);
        ApiService.SendTestPushNotification({id, ...data}).then((res) => {
            if (res && res.data) {
                setLoading(false);
                toast.success('Success');
                history.push('/users/notifications')
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
                        name: 'Notifications',
                        url: '/users/notifications'
                    }, {id: 3, name: 'Scheduled', url: '/users/notification/scheduled'}]}/>
                </Col>
                <Col xs={12} className={'mb-32'}>
                    <Content className={'p-50'}>
                        <Row>
                            <Col xs={12}>
                                <UserNotificationEditForm notification={notification} countries={countries} langs={langs}
                                                   editAndSaveNotification={editAndSaveNotification} cancelNotification={cancelNotification}/>
                            </Col>
                        </Row>
                    </Content>
                </Col>
            </Row> : <Row>
                <Col xs={12}>
                    <ContentLoader />
                </Col>
            </Row>}
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalizer.entities', {}),
        notification: get(state, 'normalizer.data.get-one-notification.result', {}),
        countries: get(state, 'normalizer.data.country-list.result', []),
        langs: get(state, 'normalizer.data.lang-list.result', {}),
        isFetched: get(state, 'normalizer.data.get-one-notification.isFetched', false),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getNotificationOneDispatch: (id) => dispatch({type: Actions.GET_ONE_NOTIFICATION.REQUEST, payload: {id}}),
        getCountryListDispatch: () => dispatch({type: AccountActions.GET_COUNTRY_LIST.REQUEST, payload: {params: {}}}),
        getLangListDispatch: () => dispatch({type: Actions.GET_LANG_LIST.REQUEST, payload: {params: {}}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ScheduledNotificationContainer));






