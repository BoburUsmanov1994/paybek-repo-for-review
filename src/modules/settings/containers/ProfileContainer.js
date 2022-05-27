import React,{useState, useEffect} from 'react';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import {connect, useDispatch} from "react-redux";
import {get} from "lodash";
import {toast} from 'react-toastify';
import {withRouter} from "react-router-dom";
import BaseBreadcrumb from "../../../components/base-breadcrumb";
import {Row,Col,Container} from "react-grid-system";
import Content from "../../../components/content";
import Avatar from "../../../components/avatar";
import Title from "../../../components/title";
import Text from "../../../components/text";
import ProfileInfoForm from "../components/ProfileInfoForm";
import ApiService from "../ApiService";
import Loader from "../../../components/loader";
import AuthActions from "../../auth/Actions";
import TXNSActions from '../../txns/Actions';
import ProfileChangePasswordForm from "../components/ProfileChangePasswordForm";
import ChangeProfilePictureForm from "../components/ChangeProfilePictureForm";
import Flex from "../../../components/flex";

const ProfileContainer = ({user,history,checkAuth, ...props}) => {

    // const dispatch = useDispatch();
    // useEffect(() => {
    //   dispatch({type: TXNSActions.SET_OLD_PAGINATION_PAGE, payload: false})
    // }, []);

    const [loading,setLoading] = useState(false);

    const editProfile = ({setError,...params}) => {
        setLoading(true);
        ApiService.EditProfile({...params}).then((res) => {
            if (res && res.data) {
                setLoading(false);
                checkAuth();
                history.push('/');
            }
        }).catch((e) => {
            setLoading(false);
            if(e.response.data && e.response.data.errors){
                e.response.data.errors.map(({errorMsg}) => toast.error(`${errorMsg}`))
                return
            }
            toast.error('ERROR');
        })
    }

    const changePassword = ({setError,...params}) => {
        setLoading(true);
        ApiService.ChangePassword({...params}).then((res) => {
            if(res && res.data){
                setLoading(false);
                history.push('/logout');
            }
        }).catch((e) => {
            setLoading(false);
            if(e.response.data && e.response.data.errors){
                e.response.data.errors.map(({errorMsg}) => toast.error(`${errorMsg}`))
                return
            }
            toast.error('ERROR');
        })
    }

    const changeProfileImg = ({formData:data,setError}) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('data',data);
        ApiService.ChangeProfileImg(formData).then((res) => {
            if(res && res.data){
                setLoading(false);
                checkAuth();
                history.push('/');
            }
        }).catch((e)=>{
            setLoading(false);
            if(e.response.data && e.response.data.errors){
                e.response.data.errors.map(({errorMsg}) => toast.error(`${errorMsg}`))
                return
            }
            toast.error('ERROR');
        })
    }
    return (
        <Container>
            <Row>
                <Col xs={12}>
                    {loading && <Loader/>}
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <BaseBreadcrumb items={[{id: 1, name: 'Settings', url: '/settings'}, {
                        id: 2,
                        name: 'My Account',
                        url: '/settings/profile'
                    }]}/>
                </Col>
                <Col xs={12}>
                    <Content>
                        <Row align={'center'}>
                            <Col xs={8}>
                                <Flex><Avatar logo={get(user,'photoUrl',null)}/><Title
                                    padding={'0 0 0 20px '}>{get(user, 'firstName', null)} {get(user, 'lastName', null)}</Title></Flex>
                            </Col>

                           <Col xs={4}>
                               <Flex align={'flex-end'} column><Text  gray margin={'0 0 5px'}>Account Type</Text><Text dark medium xl>{get(user,'roleName','-')}</Text></Flex>
                           </Col>
                        </Row>
                        <Tabs>
                            <TabList>
                                <Tab>Profile Info</Tab>
                                <Tab>Change Password</Tab>
                                <Tab>Change Profile Pic</Tab>
                            </TabList>
                            <TabPanel>
                                <ProfileInfoForm profile={user} edit={editProfile}/>
                            </TabPanel>
                            <TabPanel>
                                <ProfileChangePasswordForm changePassword={changePassword} />
                            </TabPanel>
                            <TabPanel>
                                <ChangeProfilePictureForm upload={changeProfileImg} />
                            </TabPanel>
                        </Tabs>
                    </Content>
                </Col>
            </Row>
        </Container>
    );
};
const mapStateToProps = (state) => {
    return {
        user: get(state, 'auth.user', {})
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        checkAuth:()=>dispatch({type:AuthActions.CHECK_AUTH.REQUEST})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileContainer));
