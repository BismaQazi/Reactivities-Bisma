import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import Loading from "../../../app/layout/Loading";
import { useStore } from "../../../app/stores/Store";
import ActivityChat from "./ActivityChat";
import ActivityHeader from "./ActivityHeader";
import ActivityInfo from "./ActivityInfo";
import ActivitySideBar from "./ActivitySideBar";


export default observer( function ActivityDetails() {

const {activityStore} = useStore();
const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore;
const {id} = useParams<{id: string}>();

useEffect(() => {
  if(id) loadActivity(id)
}, [id, loadActivity])

if(loadingInitial || !activity) return<Loading />;

    return (
        <Grid>
          <Grid.Column width={10}>
            <ActivityHeader activity={activity} />
            <ActivityInfo activity={activity} />
            <ActivityChat />
          </Grid.Column>
          <Grid.Column width={6}>
            <ActivitySideBar />
          </Grid.Column>
        </Grid>
    )
})