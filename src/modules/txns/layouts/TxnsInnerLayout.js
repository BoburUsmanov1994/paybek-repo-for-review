import React,{useEffect} from 'react';
import {Col, Container, Row} from "react-grid-system";
import {connect} from "react-redux";
import Sidebar from "../../../components/sidebar";
import {MenuItem} from "../../../components/menu";
import allIcon from "../../../assets/images/icons/all.svg";
import completedIcon from "../../../assets/images/icons/completed.svg";
import holdIcon from "../../../assets/images/icons/paused.svg";
import failedIcon from "../../../assets/images/icons/failed.svg";
import refundedIcon from "../../../assets/images/icons/refunded.svg";
import HasAccess from "../../../services/auth/HasAccess";
import {get,values,find,isEqual} from "lodash";
import Actions from "../Actions";

const TxnsInnerLayout = ({children,getTxnsStatusCountDispatch,status}) => {
    useEffect(() => {
        getTxnsStatusCountDispatch();
    },[])
    return (
        <Container fluid className={'pt-25'}>
            <Row>
                <Col xs={2}>
                    <HasAccess>
                        {({userCan,pages}) => (
                            <Sidebar className={'no-print'}>
                                {userCan(pages,'all') && <MenuItem icon={allIcon} exact url={'/txns'}>All</MenuItem>}
                                {userCan(pages,'completed') && <MenuItem icon={completedIcon} url={'/txns/completed'} >Completed</MenuItem>}
                                {userCan(pages,'on_hold') && <MenuItem badge count={get(find(status,item => isEqual(get(item,'status'),"HOLD")),'count',0)} icon={holdIcon} url={'/txns/hold'}>On Hold</MenuItem>}
                                {userCan(pages,'failed') && <MenuItem badge count={get(find(status,item => isEqual(get(item,'status'),"FAILED")),'count',0)} icon={failedIcon} url={'/txns/failed'}>Failed</MenuItem>}
                                {userCan(pages,'refunded') && <MenuItem icon={refundedIcon} url={'/txns/refunded'}>Refunded</MenuItem>}
                            </Sidebar>
                        )
                        }
                    </HasAccess>
                </Col>
                <Col xs={10} className={'col-10 print'}>
                    {children}
                </Col>
            </Row>
        </Container>
    );
};

const mapStateToProps = (state) =>
{
    return {
        status: get(state, 'normalizer.data.status-count.result', []),
    }
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        getTxnsStatusCountDispatch: () => dispatch({type: Actions.GET_TXNS_STATUS_COUNT.REQUEST}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TxnsInnerLayout);
