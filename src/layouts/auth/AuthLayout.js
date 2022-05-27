import React, {useState, useEffect} from 'react';
import styled, {css} from "styled-components";
import {ToastContainer} from 'react-toastify';
import {Row} from "../../components/grid";
import Logo from "../../components/logo";
import {connect} from "react-redux";
import {get, isEqual} from "lodash";
import Actions from "../../modules/auth/Actions";

const StyledAuthLayout = styled.div`
  width: 1128px;
  min-height: 80%;
  background: #FFFFFF;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 2px 1px rgba(0, 0, 0, 0.06), 0px 1px 1px rgba(0, 0, 0, 0.08);
  border-radius: 12px;

  header {
    padding: 55px 37px 55px 52px;
    border-bottom: 1px solid #E8E8E8;

    span {
      color: #969696;
    }
  }

  @media (max-width: 1600px) {
    header {
      padding: 20px 30px;
    }
  }
`;

const AuthLayout = ({children, changeEnv, env, ...props}) => {
    const [check, setCheck] = useState(false);
    useEffect(() => {
        if (isEqual(env, 'prod')) {
            setCheck(false);
        } else {
            setCheck(true)
        }
    }, [env])
    const handleChange = (val) => {
        setCheck(val);
        changeEnv(val ? 'dev' : 'prod')
    }
    return (
        <Row justify={'center'} align={'center'} height={'100vh'}>
            <StyledAuthLayout {...props}>
                <header><Row justify={'space-between'}><Logo/><span>Admin Panel <input checked={check}
                                                                                       onChange={() => handleChange(!check)}
                                                                                       type="checkbox"/></span></Row>
                </header>
                <ToastContainer/>
                {children}
            </StyledAuthLayout>
        </Row>
    );
};

const mapStateToProps = (state) => {
    return {
        env: get(state, 'auth.env', 'prod')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeEnv: (env) => dispatch({type: Actions.SET_ENV.REQUEST, payload: {env}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLayout);
