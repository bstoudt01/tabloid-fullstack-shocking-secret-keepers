import React, { useState } from "react";
import * as firebase from "firebase/app";

export const SubscriptionContext = React.createContext();

export const SubscriptionProvider = (props) => {
    const getToken = () => firebase.auth().currentUser.getIdToken();

    const [subscription, setSubscription] = useState({})

    const getSubscriptionByUserId = (userId) => {
        return getToken().then((token) => {
            fetch(`/api/subscription/${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(setSubscription)
        })
    };


    const addSubscription = (newSubscription) => {
        return getToken().then((token) => {
            fetch("/api/subscription/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newSubscription)
            })
        })
    };

    return (

        <SubscriptionContext.Provider value={{ addSubscription, subscription, getSubscriptionByUserId }}>
            {props.children}
        </SubscriptionContext.Provider>
    );

}