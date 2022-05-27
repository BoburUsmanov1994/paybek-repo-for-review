import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {get, values} from "lodash";
import {toast} from "react-toastify";
import {withRouter} from "react-router-dom";
import BaseBreadcrumb from "../../../components/base-breadcrumb";
import Content from "../../../components/content";
import {Col, Container, Row} from "react-grid-system";
import Actions from "../Actions";
import Normalizer from "../../../services/normalizer";
import ApiService from "../ApiService";
import CountryScheme from "../../../schema/CountryScheme";
import Loader from "../../../components/loader";
import AccountActions from "../../accounts/Actions";
import UserEventCreateForm from "../components/UserEventCreateForm";

const UsersEventCreateContainer = ({
                                       history,
                                       getCountryListDispatch,
                                       getLangListDispatch,
                                       entities,
                                       countries,
                                       langs
                                   }) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getCountryListDispatch();
        getLangListDispatch();
    }, []);

    countries = Normalizer.Denormalize(countries, [CountryScheme], entities).map(({id, name}) => ({
        value: id,
        label: name
    }));
    langs = values(langs).map(({lang,title}) =>({value:lang,label:title}));

    const create = (params) => {
        setLoading(true);
        ApiService.CreateEvent(params).then((res) => {
            if (res && res.data) {
                setLoading(false);
                toast.success('SUCCESS');
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
        <Container fluid>{loading && <Loader/>}
            <Row>
                <Col xs={12}>
                    <BaseBreadcrumb items={[
                        {id: 1, name: 'Account', url: '/accounts'},
                        {
                            id: 2,
                            name: 'Events',
                            url: '/users/events'
                        }, {
                            id: 3,
                            name: 'Create',
                            url: '/users/event/create'
                        }]}/>
                </Col>

                <Col xs={12}>
                    <Content>
                        <UserEventCreateForm langs={langs} create={create} countries={countries} />
                    </Content>
                </Col>
            </Row>
        </Container>
    );
};
const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalizer.entities', {}),
        countries: get(state, 'normalizer.data.country-list.result', []),
        langs: get(state, 'normalizer.data.lang-list.result', {}),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCountryListDispatch: () => dispatch({type: AccountActions.GET_COUNTRY_LIST.REQUEST, payload: {params: {}}}),
        getLangListDispatch: () => dispatch({type: Actions.GET_LANG_LIST.REQUEST, payload: {params: {}}})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UsersEventCreateContainer));
