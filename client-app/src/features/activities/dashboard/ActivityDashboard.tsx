import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import Loading from "../../../app/layout/Loading";
import { useStore } from "../../../app/stores/Store";
import ActivityFilter from "./ActivityFilters";
import ActivityList from "./ActivityList";

export default observer( function ActivityDashBoard() {
   
const {activityStore} = useStore();
const {loadActivities, activityRegistry} = activityStore;
 
  useEffect( () => {
   if(activityRegistry.size <= 1 ) loadActivities();
  },[activityRegistry.size, loadActivities])


if(activityStore.loadingInitial) return <Loading content='Loading App'/>

    return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilter />
            </Grid.Column>
        </Grid>
    )
})