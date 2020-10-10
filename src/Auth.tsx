import React, {useState} from 'react';
import { RootState } from './redux/root-reducer';
import {login, logout} from './redux/modules/auth';
import {fetchBoardStubs, createWorkflow} from './redux/modules/boards';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

const mapStateToProps = (state: RootState) => ({
  username: state.user.username,
  user: state.user.user,
  error: state.user.error
});



// const mapDispatchToProps = { login, logout };
const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      login,
      fetchBoardStubs,
      createWorkflow
    },
    dispatch
  )
};
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const UnconnectedAuth: React.FC<Props> = props => {
  // Do auth things here!
  const [username, setUsername] = useState("");


  const doLogin = () => {
    console.log(props)
    // props.bindActionReactors.attemptLogin(username)
  }

  const logout = () => {
    localStorage.clear();
  }


  return (<>
    <input type="text" value={username} onChange={e=> setUsername(e.target.value)}/>
    <button onClick={() => props.login(username)}>login</button>
    <button onClick={() => props.fetchBoardStubs()}>stubby</button>
    <button onClick={() => props.createWorkflow()}>workflow</button>
    <button onClick={() => logout()}>logout</button>
    {props.error ? <span>{props.error.message}</span> : <span>Hello, {props.user.email}</span>}
    </>);
};
export const Auth = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedAuth);
