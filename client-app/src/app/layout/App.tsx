import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/Agent';
import Loading from './Loading';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined> (undefined);
  const [editMode, setEditMode] = useState(false);
  const[loading, setLoading] = useState(true); 
  const [submitting, setSubmitting] = useState(false);
  useEffect( () => {
    agent.Activities.list().then(response => {

      setActivities(response);
      setLoading(false);
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
  setSubmitting(true);
  if(activity.id){
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(x => x.id !== activity.id), activity])
      setSelectedActivity(activity)
      setEditMode(false)
      setSubmitting(false)
    })
  } else {
    activity.id = uuid();
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity])
       setSelectedActivity(activity)
      setEditMode(false)
      setSubmitting(false)
    })
  }
}

function handleDelete(id: string) {
  setSubmitting(true)
  agent.Activities.delete(id).then(() => {
    setActivities([...activities.filter(x => x.id !== id)]);
    setSubmitting(false);
  })
  
}

if(loading) return <Loading content='Loading App'/>

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
       submitting={submitting}
       />
      </Container>
        
         
    </Fragment>
  );
}

export default App;
