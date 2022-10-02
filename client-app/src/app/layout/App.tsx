import React, { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashboard';
import Loading from './Loading';
import { useStore } from '../stores/Store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore();  
  useEffect( () => {
   activityStore.loadActivities();
  },[activityStore])


if(activityStore.loadingInitial) return <Loading content='Loading App'/>

  return (
    <Fragment>
      <NavBar/>
      <Container style={{marginTop: '7em'}}> 
      <ActivityDashBoard />
      </Container>
      </Fragment>
  );
}

export default observer(App);
