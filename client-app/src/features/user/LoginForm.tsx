import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IUserFormValues } from "../../app/models/user";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import ErrorMessage from "../../app/common/form/ErrorMessage";

const validate = combineValidators({
	email: isRequired("email"),
	password: isRequired("password"),
});

const LoginForm = () => {
	const { userStore } = useContext(RootStoreContext);
	const { login } = userStore;

	return (
		<FinalForm
			onSubmit={(values: IUserFormValues) =>
				login(values).catch((error) => ({
					[FORM_ERROR]: error,
				}))
			}
			validate={validate}
			render={({
				handleSubmit,
				submitting,
				submitError,
				invalid,
				pristine,
				dirtySinceLastSubmit,
			}) => (
				<Form error>
					<Header
						as='h2'
						content='Login'
						color='teal'
						textAlign='center'
					/>
					<Field
						name='email'
						component={TextInput}
						placeholder='Email'
					/>
					<Field
						name='password'
						type='password'
						component={TextInput}
						placeholder='Password'
					/>
					{submitError && !dirtySinceLastSubmit && (
						<ErrorMessage
							error={submitError}
							text='Invalid email or password'
						/>
					)}
					<Button
						loading={submitting}
						disabled={
							(invalid && !dirtySinceLastSubmit) ||
							pristine ||
							submitting
						}
						color='teal'
						content='Login'
						onClick={handleSubmit}
						fluid
					/>
				</Form>
			)}
		/>
	);
};

export default LoginForm;
