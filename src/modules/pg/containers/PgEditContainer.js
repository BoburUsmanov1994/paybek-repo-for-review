import React, {useEffect, useState} from 'react';
import BaseBreadcrumb from "../../../components/base-breadcrumb";
import {Col, Container, Row} from "react-grid-system";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Content from "../../../components/content";
import {get, includes,isEqual} from "lodash";
import Actions from "../Actions";
import Normalizer from "../../../services/normalizer";
import PgScheme from "../../../schema/PgScheme";
import ContentLoader from "../../../components/loader/ContentLoader";
import AccountActions from "../../accounts/Actions";
import ApiActions from "../../../services/api/Actions";
import CountryScheme from "../../../schema/CountryScheme";
import ApiService from "../ApiService";
import {toast} from "react-toastify";
import Loader from "../../../components/loader";
import PgEditForm from "../components/PgEditForm";
import Avatar from '../../../components/avatar';
import Text from '../../../components/text';
import Title from '../../../components/title';
import Flex from '../../../components/flex';

const PgEditContainer = ({
                             history,
                             id,
                             getPgOneDispatch,
                             entities,
                             pg,
                             isFetched,
                             getCountryListDispatch,
                             countries,
                             setTrigger
                         }) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setTrigger()
        getPgOneDispatch(id);
        getCountryListDispatch();
    }, [id]);

    pg = Normalizer.Denormalize(pg, PgScheme, entities);
    countries = Normalizer.Denormalize(countries, [CountryScheme], entities);
    const createOrEdit = (params) => {
        console.log(params);
        let {countryIsos, active, ...rest} = params;
        active = isEqual(active, 'ACTIVE') ? true : false;
        countryIsos = countries.filter(country => includes(countryIsos, get(country, 'id'))).map(({countryIso}) => countryIso);
        setLoading(true);
        ApiService.CreateOrEditPg({...rest, active, countryIsos}).then((res) => {
            if (res && res.data) {
                setLoading(false);
                toast.success('SUCCESS');
                history.push('/pg')
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
            </Row>
            <Row>
                <Col xs={12}>
                    <BaseBreadcrumb
                        items={[{id: 1, name: 'PG', url: '/pg'}, {id: 2, name: 'Edit', url: '/pg/update'}]}/>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Content className={'p-50'}>
                    {isFetched ?
                        <>
                            <Row align='center'>
                                <Col xs={10}>
                                    <Flex>
                                        <Avatar logo={get(pg, 'country.countryFlagUrl', null)} />
                                        <Title className = {"ml-16"}>{get(pg, 'country.countryIso', null)}</Title>
                                    </Flex>
                                    
                                </Col>
                                <Col xs={2}>
                                    <Text>PG</Text>
                                    <Title>Stripe</Title>
                                </Col>
                            </Row>
                            <Row className={"mt-32"}>
                                <Col>
                                    <Title>Edit</Title>
                                </Col>
                            </Row>
                            <Row className={"mt-16 p-50-minus"}>
                                <Col xs={12}>
                                    <hr />
                                </Col>
                                
                            </Row>
                            <PgEditForm pg={isFetched && pg} countries={countries} createOrEdit={createOrEdit}/>
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
        pg: get(state, 'normalizer.data.get-pg-one.result', []),
        isFetched: get(state, 'normalizer.data.get-pg-one.isFetched', false),
        countries: get(state, 'normalizer.data.country-list.result', []),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPgOneDispatch: (id) => dispatch({type: Actions.GET_PG_ONE.REQUEST, payload: {id}}),
        getCountryListDispatch: () => dispatch({type: AccountActions.GET_COUNTRY_LIST.REQUEST, payload: {params: {}}}),
        setTrigger: () => dispatch({
            type: ApiActions.GET_ONE.TRIGGER,
            payload: {
                scheme: {},
                storeName: 'get-pg-one',
            },
        }),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PgEditContainer));
