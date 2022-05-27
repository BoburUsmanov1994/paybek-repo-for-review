import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {get, isEmpty} from "lodash";
import {withRouter} from "react-router-dom";
import {Col, Container, Row} from "react-grid-system";
import {confirmAlert} from 'react-confirm-alert';
import BaseBreadcrumb from "../../../components/base-breadcrumb";
import Content from "../../../components/content";
import BaseTable from "../../../components/base-table";
import BaseButton from "../../../components/base-button";
import Actions from "../Actions";
import Normalizer from "../../../services/normalizer";
import ContentLoader from "../../../components/loader/ContentLoader";
import AccountTypeScheme from "../../../schema/AccountTypeScheme";
import Flex from "../../../components/flex";
import BasePagination from "../../../components/base-pagination";
import {Edit, Trash} from 'react-feather';
import HasAccess from "../../../services/auth/HasAccess";
import {toast} from "react-toastify";
import Text from "../../../components/text";
import BaseSelect from "../../../components/base-select";

const AccountTypesContainer = ({history, getAccountTypeListDispatch, entities, roles, isFetched,totalPages,pageSize,pageNumber}) => {
    const [filter,setFilter] = useState({searchingField:"",page:0,size:pageSize});
    useEffect(() => {
        getAccountTypeListDispatch({...filter});
    }, [filter]);

    roles = Normalizer.Denormalize(roles, [AccountTypeScheme], entities);

    const deleteRole = (id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => toast.error('Error')
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    const editRole = (id) => {

    }

    return (
        <Container fluid>
            <Row>
                <Col xs={12} className={'mb-8'}>
                    <BaseBreadcrumb items={[{id: 1, name: 'Account', url: '/accounts'}, {
                        id: 2,
                        name: 'Account Types',
                        url: '/accounts/types'
                    }]}/>
                </Col>
                <Col xs={12}>
                    <Content>
                        <Row>
                            <Col xs={12} className={'mb-16'}>
                                <Row align={'center'}>
                                    <Col xs={12} className={'text-right'}>
                                        <Flex justify={'flex-end'}>
                                            <HasAccess>
                                                {
                                                    ({userCan, permissions}) => userCan(permissions, 'ADD_ROLE') &&
                                                        <BaseButton primary
                                                                    handleClick={() => history.push('/accounts/types/create')}>Add</BaseButton>
                                                }
                                            </HasAccess>
                                        </Flex>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12} className={'mb-32'}>
                                {isFetched ?
                                    <BaseTable
                                        tableHeader={['ID', 'Name', 'Description', 'Action']}>
                                        {!isEmpty(roles) ? roles.map((item,index) => <tr key={get(item, 'id', null)}>
                                            <td>{index+1}</td>
                                            <td>{get(item, 'name', '')}</td>
                                            <td>{get(item, 'description', '')}</td>
                                            <td>
                                                <HasAccess>
                                                    {({userCan, permissions}) => <>
                                                        {userCan(permissions, 'EDIT_ROLE') &&
                                                        <Edit onClick={()=>history.push('/accounts/types/update/'+get(item, 'id', null))} className={'cursor-pointer mr-4'} color="#53AC92"
                                                              size={20}/>}
                                                        <Trash onClick={() => deleteRole(get(item, 'id', null))}
                                                               className={'cursor-pointer ml-4 d-none'} color="#EC536A"
                                                               size={20}/>
                                                    </>
                                                    }
                                                </HasAccess></td>
                                        </tr>) : <tr>
                                            <td colSpan={10}>No data</td>
                                        </tr>
                                        }
                                    </BaseTable> : <ContentLoader/>
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
                    </Content>
                </Col>
            </Row>
        </Container>

    );
};

const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalizer.entities', {}),
        roles: get(state, 'normalizer.data.account-types-list.result.content', []),
        isFetched: get(state, 'normalizer.data.account-types-list.isFetched', false),
        totalPages: get(state, 'normalizer.data.account-types-list.result.totalPages', 0),
        pageSize: get(state, 'normalizer.data.account-types-list.size', 10),
        pageNumber: get(state, 'normalizer.data.account-types-list.result.number', 0),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAccountTypeListDispatch: (params) => dispatch({type: Actions.GET_ACCOUNT_TYPE_LIST.REQUEST, payload: {params}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AccountTypesContainer));
