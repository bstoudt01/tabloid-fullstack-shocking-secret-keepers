import React, { useState } from "react";
import * as firebase from "firebase/app";

export const SubscriptionContext = React.createContext();

export const SubscriptionProvider = (props) => {
    const getToken = () => firebase.auth().currentUser.getIdToken();

    const [subscription, setSubscription] = useState({})
    const [allSubscribedPosts, setAllSubscribedPosts] = useState([])

    const getSubscriptionByUserId = (userId, authorId) => {

        return getToken().then((token) => {
            fetch(`/api/subscription/${userId}/getby/${authorId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => {
                if (resp.status === 200) {
                    setSubscription(resp.json())
                }
                else {
                    setSubscription(null);
                }

            })
        })
    }





    const getAllSubscribedPostsForUser = (userId) => {
        return getToken().then((token) => {
            fetch(`/api/subscription/subscribedposts/${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(setAllSubscribedPosts);
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

    const unsubscribeFromAuthor = (subscription) => {
        return getToken().then((token) => {
            fetch(`/api/subscription/${subscription.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(subscription)

            })
        })
    };

    return (

        <SubscriptionContext.Provider value={{ unsubscribeFromAuthor, allSubscribedPosts, getAllSubscribedPostsForUser, addSubscription, subscription, getSubscriptionByUserId }}>
            {props.children}
        </SubscriptionContext.Provider>
    );

}
