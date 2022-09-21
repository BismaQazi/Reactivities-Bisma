import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined> (undefined);
  const [editMode, setEditMode] = useState(false);
  useEffect( () => {
    axios.get('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data);
    })
  },[])

function handleSelectActivity(id: string) {
  setSelectedActivity(activities.find(x => x.id === id));
}

function handlecancelActivity() {
  setSelectedActivity(undefined);
}

function handleFormOpen(id?: string) {
  id ? handleSelectActivity(id) : handlecancelActivity();
  setEditMode(true);
}

function handleFormClose () {
  setEditMode(false);
}

function handleCreateEdit (activity: Activity) {
  activity.id ?
   setActivities([...activities.filter(x => x.id !== activity.id), activity]) : 
   setActivities([...activities, {...activity, id: uuid()}]);
   setEditMode(false);
   setSelectedActivity(selectedActivity);
}

function handleDelete(id: string) {
  setActivities([...activities.filter(x => x.id !== id)]);
}

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
       <ActivityDashBoard 
       activities={activities}
       selectedActivity={selectedActivity}
       selectActivity={handleSelectActivity}
       cancelActivity={handlecancelActivity}
       editMode={editMode}
       openForm={handleFormOpen}
       closeForm={handleFormClose}
       createOrEdit={handleCreateEdit}
       deleteActivity={handleDelete}
       />
      </Container>
        
         
    </Fragment>
  );
}

export default App;
