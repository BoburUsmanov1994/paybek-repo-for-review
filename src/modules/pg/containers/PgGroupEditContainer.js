import React, {useEffect, useState} from 'react';
import BaseBreadcrumb from "../../../components/base-breadcrumb";
import {Col, Container, Row} from "react-grid-system";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Content from "../../../components/content";
import PgGroupEditForm from "../components/PgGroupEditForm";
import {get, includes,isEqual,orderBy} from "lodash";
import Normalizer from "../../../services/normalizer";
import ApiService from "../ApiService";
import {toast} from "react-toastify";
import Loader from "../../../components/loader";
import Actions from "../Actions";
import DingCountryScheme from "../../../schema/DingCountryScheme";

const PgGroupEditContainer = ({
                                  history,
                                  entities,
                                  getCountryListDispatch,
                                  countries
                              }) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getCountryListDispatch();
    }, []);
    countries = Normalizer.Denormalize(countries, [DingCountryScheme], entities);
    const createOrEdit = ({active, ...params}) => {
        active = isEqual(active,'ACTIVE') ? true : false;
        setLoading(true);
        ApiService.CreateOrEditPg({active, ...params}).then((res) => {
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
                        items={[{id: 1, name: 'PG', url: '/pg'}, {id: 2, name: 'Edit Group', url: '/pg/update'}]}/>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Content className={'p-50'}>
                        <PgGroupEditForm countries={countries} createOrEdit={createOrEdit}/>
                    </Content>
                </Col>
            </Row>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalizer.entities', {}),
        countries: get(state, 'normalizer.data.get-countries-from-ding.result', []),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCountryListDispatch: () => dispatch({type: Actions.GET_COUNTRIES_FROM_DING.REQUEST, payload: {params: {}}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PgGroupEditContainer));
