import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { CommentContext } from "../../providers/CommentProvider";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const AddComment = () => {
    let userId = sessionStorage.userProfileId
    console.log(userId);
    //id to use for postId (when user clicks the addcomment button on post details page)
    const { id } = useParams();
    const history = useHistory();
    const { addComment, getAllCommentsForPost, getAllComments } = useContext(CommentContext);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getAllComments();
    }, [])
    //hard coding postId for now; need to use id from useparams as postId;
    const [newComment, setNewComment] = useState({
        postId: 1,
        userProfileId: parseInt(userId),
        subject: "",
        content: ""
    })
    console.log(newComment);

    //handling input field for posting new comment
    const handleFieldChange = (e) => {
        const stateToChange = { ...newComment };
        stateToChange[e.target.id] = e.target.value;
        setNewComment(stateToChange);
    };

    //add new comment function
    const addNewComment = () => {
        setIsLoading(true);
        addComment(newComment).then(getAllComments())
        setIsLoading(false);
        //need to change 1 to dyanmic id route
        history.push(`/commentsbypost/1`)
    }

    return (
        <>
            <Form>
                <h3> Add A Comment </h3>
                <FormGroup>
                    <Label htmlFor="subject"><strong>Subject</strong></Label>
                    <Input className="p-2 bd-highlight justify-content-center"
                        value={newComment.subject}
                        onChange={handleFieldChange}
                        type="text"
                        name="subject"
                        id="subject"
                        required=""
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="content"><strong>Comment</strong></Label>
                    <Input className="p-2 bd-highlight justify-content-center"
                        value={newComment.content}
                        onChange={handleFieldChange}
                        type="textarea"
                        name="content"
                        id="content"
                        required=""
                    />
                </FormGroup>
            </Form >
            <Button className="submitComment" type="button" color="success" isLoading={isLoading} onClick={addNewComment}>
                {'Save Comment'}
            </Button>
        </>
    )


};

export default AddComment;
