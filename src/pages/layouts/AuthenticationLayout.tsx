import React, { Component } from 'react'


const AuthenticationLayout = (props:any) => {

    const AuthLayout = {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column" as "column",
        justifyContent: "center",
        alignItems: "center"
      };

    const CardLayout = {
        border: 'black solid 2px',
        minWidth: '400px',
        minHeight: '400px'
    }


    return (
        <div style={AuthLayout}>
            <div style={CardLayout}>
                {props.children}
            </div>
        </div>
    );

}

export default AuthenticationLayout;