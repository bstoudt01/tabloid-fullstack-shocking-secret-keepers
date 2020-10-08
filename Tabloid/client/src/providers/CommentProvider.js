import React, { useState, useEffect } from "react";
import * as firebase from "firebase/app";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState();
    const getToken = () => firebase.auth().currentUser.getIdToken();

    const getAllCommentsForPost = (postId) => {
        return getToken().then((token) => {
            fetch(`/api/comment/getallcommentsbypost/${postId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(setComments);
        })
    };

    const getCommentById = (commentId) => {
        return getToken().then((token) => {
            fetch(`/api/comment/${commentId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(setComment);
        })
    };

    const addComment = (newComment) => {
        return getToken().then((token) => {
            fetch("/api/comment/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newComment)
            }).then(resp => resp.json())
        })
    };

    const editComment = (comment) => {
        return getToken().then((token) => {
            fetch(`/api/comment/${comment.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(comment)
            }).then(resp => resp.json())
        })
    }

    const deleteComment = (commentId) => {
        return getToken().then((token) => {
            fetch(`/api/comment/${commentId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
        })
    }

    return (

        <CommentContext.Provider value={{ comments, getAllCommentsForPost, getCommentById, addComment, editComment, deleteComment }}>
            {props.children}
        </CommentContext.Provider>
    );
}