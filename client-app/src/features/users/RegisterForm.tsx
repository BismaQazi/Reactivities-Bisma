import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/Store";
import * as Yup from 'yup';
import ValidationError from "../errors/ValidationError";

export default observer (function RegisterForm () {
    const {userStore} = useStore()
    return(
        <Formik
        initialValues={{displayName:'',username:'' , email: '', password: '', error: null}}
        onSubmit={(values, {setErrors}) => userStore.register(values).catch(error => 
            setErrors({error}))}
            validationSchema= {Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required()
            })}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className="ui form error" onSubmit={handleSubmit} autoComplete='off' >
                    <Header as='h2' color="teal" content='Sign up to Reactivities' textAlign="center" />
                    <MyTextInput name="displayName" placeholder="display Name" />
                    <MyTextInput name="username" placeholder="Username" />
                    <MyTextInput name="email" placeholder="Email" />
                    <MyTextInput name="password" placeholder="Password" type='password' />
                    <ErrorMessage 
                    name="error" render={() => 
                    <ValidationError errors={errors.error} />}
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting}
                     loading={isSubmitting} positive content='Register' type="submit" fluid />
                </Form>
            )}
        </Formik>
    )
})