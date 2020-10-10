import React, { Component } from 'react'

const SignUpForm = () => {

    const formStyle = {
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // height: '100%',
        padding: '15px'
    }

    return (
        <form style={formStyle}>
            {/* Sign up form */}
            <label htmlFor="username">username</label>
            <input id="username" type="text"/>
            <input type="text"/>
            <input type="text"/>
            <input type="text"/>
        </form>
    )

}

export default SignUpForm;