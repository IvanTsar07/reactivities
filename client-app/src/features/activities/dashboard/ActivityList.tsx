import React, { useContext, Fragment } from "react";
import { Item, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityListitem from "./ActivityListItem";
import ActivityStore from "../../../app/stores/activityStore";

const ActivityList: React.FC = () => {
	const { activitiesByDate } = useContext(ActivityStore);
	console.log(activitiesByDate);
	return (
		<Fragment>
			{activitiesByDate.map(([group, activities]) => (
				<Fragment key={group}>
					<Label size='large' color='blue'>
						{group}
					</Label>

					<Item.Group divided>
						{activities.map(activity => (
							<ActivityListitem activity={activity} key={activity.id} />
						))}
					</Item.Group>
				</Fragment>
			))}
		</Fragment>
	);
};

export default observer(ActivityList);
