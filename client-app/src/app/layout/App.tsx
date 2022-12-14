import { Fragment, useEffect } from 'react';
import { Container, Modal } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestError from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/Store';
import Loading from './Loading';
import ModalContainer from '../common/modals/ModalContainer';

function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore()

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <Loading content='Loading App...' />

  return (
    <Fragment>
      <ToastContainer position='bottom-right' hideProgressBar theme='dark'/>
      <ModalContainer />
      <Route exact path='/' component={HomePage}/>
      <Route
      path={'/(.+)'}
      render={() => (
        <>
         <NavBar/>
      <Container style={{marginTop: '7em'}}> 
      
         <Switch>
      <Route exact path='/activities' component={ActivityDashBoard}/>
      <Route path='/activities/:id' component={ActivityDetails}/>
      <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm}/>
      <Route path='/errors' component={TestError}/>
      <Route path='/server-error' component={ServerError}/>
      <Route path='/login' component={LoginForm}/>
      <Route component={NotFound}/>
      
         </Switch>

      </Container>
     </>
      )}
      />
     
      </Fragment>
  );
}

export default observer(App);
