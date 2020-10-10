import React, { Component } from 'react'
import Home from './Home';
import AuthenticationLayout from './layouts/AuthenticationLayout';
import SignUpForm from '../components/authentication/SignUpForm';

const SignUp = () => {

    return (
        <AuthenticationLayout>
            <SignUpForm></SignUpForm>
        </AuthenticationLayout>
    )

}


export default SignUp;