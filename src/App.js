import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import ApiClient from './ApiClient';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Stores = React.lazy(() => import('./views/Pages/Stores'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      authState: false,
    };

  }

  componentDidMount() {

    this.authenticate();

  }

  authenticate() {

    ApiClient.get('/auth')
      .then(res => {

        const { success } = res;

        console.table(res);

        this.setState({ authState: success });

      })
      .catch(console.log);

  }


  render() {

    return (
      <Router>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
            <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
            <Route exact path="/stores" name="Stores Page" render={props => <Stores {...props} />} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
            {
              this.state.authState
                ? <Route path="/" name="Auth" render={props => <DefaultLayout {...props} />} />
                : <Route path="/" name="Auth" render={props => <Login {...props} />} />
            }
          </Switch>
        </React.Suspense>
      </Router>
    );
  }
}

export default App;
