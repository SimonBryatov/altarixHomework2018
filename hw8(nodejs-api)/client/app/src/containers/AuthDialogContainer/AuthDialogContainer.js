import React from "react";
import { observer, inject } from "mobx-react"
import AuthDialog from '../../components/AuthDialog/AuthDialog';
import authForm from '../../stores/forms/authForm';

let AuthDialogContainer = ({ViewStore}) => {
    return(<AuthDialog isWaiting={0} open={ViewStore.authDialogState} authForm={authForm}/>)
}

AuthDialogContainer = inject('ViewStore')(observer(AuthDialogContainer))

export default AuthDialogContainer;