import React, { useState } from "react";
import * as firebase from "firebase/app";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {

    //All Reaction Types
    const [allReactionTypes, setAllReactionTypes] = useState([]);

    //Single Reaction Type... needed?
    //const [reaction, setReaction] = useState({});

    //All Reactions on a post
    const [postReactions, setpostReactions] = useState([]);

    //Single Reaction on a post.. needed?
    //const [postReaction, setPostReaction] = useState({});

    const getToken = () => firebase.auth().currentUser.getIdToken();

    const getAllReactions = () => {
        return getToken().then((token) => {
            fetch("/api/reaction", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(setAllReactionTypes);
        })
    };

    const getAllReactionsForPost = (postId) => {
        return getToken().then((token) => {
            fetch(`/api/reaction/GetAllReactionsByPost/${postId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(setpostReactions);
        })
    };

    const addReaction = (newReaction) => {
        return getToken().then((token) => {
            fetch("/api/reaction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newReaction)
            })
        })
    };

    const addPostReaction = (newPostReaction) => {
        return getToken().then((token) => {
            fetch("/api/reaction/PostReaction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newPostReaction)
            })
        })
    };



    return (

        <CommentContext.Provider value={{ getAllReactions, getAllReactionsForPost, addReaction, addPostReaction, allReactionTypes, postReactions }}>
            {props.children}
        </CommentContext.Provider>
    );
}