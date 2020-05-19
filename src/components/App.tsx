import React, { Component } from 'react';
import NavBar from './partials/NavBar';
import Footer from './partials/Footer';
import Home from './pages/Home';
import 'bulma/css/bulma.css';
import './App.css';
import { connect } from 'react-redux';
import { checkLoginState } from '../redux/actions/AuthActions';
import { RootState } from '../redux/Root';
import { Dispatch } from 'redux';
import ToastContainer from './partials/ToastContainer';
import { HashRouter as Router, Route } from 'react-router-dom';
import Settings from './pages/settings/Index';
import Todos from './pages/todos/Index';
import PrivateRoute from './utils/PrivateRoute';
import io from 'socket.io-client';
import { AuthTransactionType } from '../redux/states/AuthState';
import { notify } from '../redux/actions/NotifyActions';
import { Severity } from '../redux/states/NotifState';

interface Props {
    isTransactionLoading: boolean;
    transactionType: AuthTransactionType | null;
    dispatch: Dispatch<any>;
}

class App extends Component<Props> {
    public socket: any;

    componentWillMount() {
        this.socket = io("https://nusid.net/");
        this.socket.on("notification", (data: any) => {
            this.props.dispatch(
                notify({
                    message: data.title+' '+data.message,
                    date: new Date(),
                    type: Severity.INFO,
                }));
        });
        this.props.dispatch(checkLoginState());
    }

    componentWillUnmount() {
        this.socket.close();
    }

    render() {
        if (this.props.isTransactionLoading && this.props.transactionType === AuthTransactionType.CHECK_LOGIN_STATE) {
            const style: React.CSSProperties = {
                position: 'fixed' /* or absolute */,
                top: '50%',
                left: '50%',
            };
            return <h1 style={style}>Loading...</h1>;
        } else {
            return (
                <Router>
                    <NavBar />
                    <ToastContainer />
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <PrivateRoute path="/settings">
                        <Settings />
                    </PrivateRoute>
                    <PrivateRoute path="/todos">
                        <Todos />
                    </PrivateRoute>
                    <Footer />
                </Router>
            );
        }
    }
}

const mapStateToProps = (state: RootState) => ({
    isTransactionLoading: state.auth.isTransactionLoading,
    transactionType: state.auth.transactionType,
});

export default connect(mapStateToProps)(App);
