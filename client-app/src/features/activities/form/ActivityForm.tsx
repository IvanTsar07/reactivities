import React, { useState, FormEvent } from "react";
import { v4 as uuid } from "uuid";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface IProps {
	activity: IActivity;
	submitting: boolean;
	setEditMode: (id: boolean) => void;
	createActivity: (activity: IActivity) => void;
	editActivity: (activity: IActivity) => void;
}

const ActivityForm: React.FC<IProps> = ({
	activity: initialFormState,
	submitting,
	setEditMode,
	createActivity,
	editActivity
}) => {
    const initializeForm = () => {
        if (initialFormState) {
            return initialFormState;
        } else {
            return {
                id: "",
                title: "",
                description: "",
                date: "",
                category: "",
                city: "",
                venue: "",
            };
        }
    };

    const [activity, setActivity] = useState<IActivity>(initializeForm);

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
				id: uuid()
			}
			createActivity(newActivity);
		} else { 
			editActivity(activity);
		}
    }

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
					onClick={() => setEditMode(false)}
				/>
			</Form>
		</Segment>
	);
};

export default ActivityForm;
