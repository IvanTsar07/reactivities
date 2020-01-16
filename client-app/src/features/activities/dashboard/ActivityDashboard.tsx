import React, { SyntheticEvent } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface IProps {
	activities: IActivity[];
	target: string;
	selectedActivity: IActivity | null;
	editMode: boolean;
	submitting: boolean;
	selectActivity: (id: string) => void;
	setEditMode: (mode: boolean) => void;
	setSelectedActivity: (activity: IActivity | null) => void;
	createActivity: (activity: IActivity) => void;
	editActivity: (activity: IActivity) => void;
	deleteActivity: (event: SyntheticEvent<HTMLButtonElement>,id: string) => void;
}

const ActivityDashboard: React.FC<IProps> = ({
	activities,
	submitting,
	selectActivity,
	selectedActivity,
	editMode,
	target,
	setEditMode,
	setSelectedActivity,
	createActivity,
	editActivity,
	deleteActivity
}) => {
	return (
		<Grid>
			<Grid.Column width={10}>
				<ActivityList
					target={target}
					submitting={submitting}
					activities={activities}
					selectActivity={selectActivity}
					deleteActivity={deleteActivity}
				/>
			</Grid.Column>

			<GridColumn width={6}>
				{selectedActivity && !editMode && (
					<ActivityDetails
						activity={selectedActivity}
						setEditMode={setEditMode}
						setSelectedActivity={setSelectedActivity}
					/>
				)}
				{editMode && (
					<ActivityForm
						submitting={submitting}
						key={(selectedActivity && selectedActivity.id) || 0}
						activity={selectedActivity!}
						setEditMode={setEditMode}
						createActivity={createActivity}
						editActivity={editActivity}
					/>
				)}
			</GridColumn>
		</Grid>
	);
};

export default ActivityDashboard;
