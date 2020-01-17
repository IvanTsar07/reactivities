import React, { useState, FormEvent, useContext, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/stores/activityStore";
import { RouteComponentProps } from "react-router-dom";

interface DetailParams {
	id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
	match,
	history,
}) => {
	const {
		loadActivity,
		createActivity,
		editActivity,
		clearActivity,
		submitting,
		activity: initialFormState,
	} = useContext(ActivityStore);

	const [activity, setActivity] = useState<IActivity>({
		id: "",
		title: "",
		description: "",
		date: "",
		category: "",
		city: "",
		venue: "",
	});

	useEffect(() => {
		if (match.params.id && activity.id.length === 0) {
			loadActivity(match.params.id).then(
				() => initialFormState && setActivity(initialFormState),
			);
		}

		return () => {
			clearActivity();
		};
	}, [loadActivity, match.params.id, clearActivity, initialFormState, activity.id.length]);

	const handleInputChange = (
		event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name = "", value = "" } = event.currentTarget;
		setActivity({ ...activity, [name]: value });
	};

	const handleSubmit = () => {
		if (activity.id.length === 0) {
			let newActivity = {
				...activity,
				id: uuid(),
			};
			createActivity(newActivity).then(() =>
				history.push(`/activities/${newActivity.id}`),
			);
		} else {
			editActivity(activity).then(() =>
				history.push(`/activities/${activity.id}`),
			);
		}
	};

	return (
		<Segment clearing>
			<Form onSubmit={handleSubmit}>
				<Form.Input
					name={"title"}
					placeholder='Title'
					value={activity.title}
					onChange={handleInputChange}
				/>
				<Form.TextArea
					name={"description"}
					rows={2}
					placeholder='Description'
					value={activity.description}
					onChange={handleInputChange}
				/>
				<Form.Input
					name={"category"}
					placeholder='Category'
					value={activity.category}
					onChange={handleInputChange}
				/>
				<Form.Input
					name={"date"}
					type='datetime-local'
					placeholder='Date'
					value={activity.date}
					onChange={handleInputChange}
				/>
				<Form.Input
					name={"city"}
					placeholder='City'
					value={activity.city}
					onChange={handleInputChange}
				/>
				<Form.Input
					name={"venue"}
					placeholder='Venue'
					value={activity.venue}
					onChange={handleInputChange}
				/>

				<Button
					loading={submitting}
					floated='right'
					positive
					type='submit'
					content='Submit'
				/>
				<Button
					floated='left'
					type='button'
					content='Cancel'
					onClick={() => history.push('/activities')}
				/>
			</Form>
		</Segment>
	);
};

export default observer(ActivityForm);
