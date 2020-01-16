import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
import agent from "../api/agent";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";

const App = () => {
	const [activities, setActivities] = useState<IActivity[]>([]);
	const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
		null,
	);
	const [editMode, setEditMode] = useState(false);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [target, setTarget] = useState('');

	const handleSelectActivity = (id: string) => {
		setSelectedActivity(activities.filter(a => a.id === id)[0]);
		setEditMode(false);
	};

	const handleOpenCreateForm = () => {
		setSelectedActivity(null);
		setEditMode(true);
	};

	const handleCreateActivity = (activity: IActivity) => {
		setSubmitting(true);
		agent.Activities.create(activity)
			.then(res => {
				setActivities([...activities, activity]);
				setSelectedActivity(activity);
				setEditMode(false);
			})
			.then(() => setSubmitting(false))
			.catch(err => {
				console.log(err);
			});
	};

	const handleEditActivity = (activity: IActivity) => {
		setSubmitting(true);
		agent.Activities.update(activity)
			.then(res => {
				setActivities([
					...activities.filter(a => a.id !== activity.id),
					activity,
				]);
				setSelectedActivity(activity);
				setEditMode(false);
			})
			.then(() => setSubmitting(false))
			.catch(err => {
				console.log(err);
			});
	};

	const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
		setSubmitting(true);
		setTarget(event.currentTarget.name);
		agent.Activities.delete(id)
			.then(res => {
				setActivities([...activities.filter(a => a.id !== id)]);
			})
			.then(() => setSubmitting(false))
			.catch(err => {
				console.log(err);
			});
	};

	useEffect(() => {
		agent.Activities.list()
			.then(res => {
				let activities = [];
				res.forEach(activity => {
					activity.date = activity.date.split(".")[0];
					activities.push(activity);
				});
				setActivities(res);
			})
			.then(() => setLoading(false))
			.catch(err => {
				console.log(err);
			});
	}, []);

	if (loading)
		return (
			<LoadingComponent content='Loading activities' inverted={true} />
		);

	return (
		<Fragment>
			<NavBar openCreateForm={handleOpenCreateForm} />
			<Container style={{ marginTop: "7em" }}>
				<ActivityDashboard
					target={target}
					submitting={submitting}
					activities={activities}
					selectActivity={handleSelectActivity}
					selectedActivity={selectedActivity!}
					setSelectedActivity={setSelectedActivity}
					editMode={editMode}
					setEditMode={setEditMode}
					createActivity={handleCreateActivity}
					editActivity={handleEditActivity}
					deleteActivity={handleDeleteActivity}
				/>
			</Container>
		</Fragment>
	);
};

export default App;
