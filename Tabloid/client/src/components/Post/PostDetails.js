import React, { useContext, useEffect, useState } from "react";
import { PostContext, PostProvider } from "../../providers/PostProvider";
import { Card, CardImg, CardBody, Row, Button, Col, ListGroup } from "reactstrap";
import { SubscriptionContext } from "../../providers/SubscriptionProvider";
import { useHistory } from "react-router-dom";
import PostTag from "../PostTag/PostTag";
import { Link, NavLink, useParams } from "react-router-dom";
import { PostTagContext } from "../../providers/PostTagProvider";
import AddPostTag from "../PostTag/PostTagAdd";


const PostDetails = () => {

    let userId = sessionStorage.userProfileId
    const { getPost, post } = useContext(PostContext);
    console.log("post", post);

    //using subscription context for posting of new subscription
    const { unsubscribeFromAuthor, addSubscription, subscription, getSubscriptionByUserId } = useContext(SubscriptionContext);
    const [postSubscription, setPostSubscription] = useState({});
    console.log("subscription", subscription);

    //setting new subscription object into state
    const [newSubscription, setNewSubscription] = useState({
        subscriberUserProfileId: parseInt(userId)
    })
    console.log("newSub", newSubscription)


    const { id } = useParams();
    const history = useHistory();
    const { postTags, getAllPostTagsByPost } = useContext(PostTagContext);

    useEffect(() => {
        getPost(id);

    }, []);

    useEffect(() => {
        // debugger
        getSubscriptionByUserId(parseInt(userId), post.userProfileId);
    }, [post])

    useEffect(() => {
        // debugger;
        setPostSubscription(subscription);
    }, [subscription])


    const calculateReadTime = () => {
        let time = 0;
        let test = 0;
        if (post.content != undefined) {
            test = post.content.split(" ").length;
        }

        time = test / 265;
        time = Math.ceil(time);

        return time;

    }

    //subscribe to author 
    const subscribeToAuthor = (e) => {
        e.preventDefault();
        newSubscription.providerUserProfileId = post.userProfileId;
        newSubscription.endDateTime = new Date().toISOString();
        addSubscription(newSubscription);
        alert("You are now subscribed to this author");
        //should take away the button to subscribe and show unsubscribe button
        getSubscriptionByUserId(parseInt(userId), post.userProfileId);


    }

    const unsubscribe = (e) => {
        e.preventDefault();
        let updatedSubscription = {
            id: subscription.id,
            subscriberUserProfileId: parseInt(userId),
            providerUserProfileId: post.userProfileId,

        }
        //change end date time to current time and isSubscribed should be edited to 0 (in repository), therefore... show the subscribe button again
        unsubscribeFromAuthor(updatedSubscription);
        alert("You are no longer subscribed to this author");
        //get the subscription info and should then should refresh and show subscribe button
        getSubscriptionByUserId(parseInt(userId), post.userProfileId);
    }


    // useEffect(() => {
    //     debugger
    //     getAllPosts();
    // }, [])

    useEffect(() => {
        getAllPostTagsByPost(id);
    }, [id]);

    return (

        <>
            {/* NOT Working!! will only show the subscribe button if the person logged in is not the author of the post 
            AND if there IS NOT already a subscription between the author and user, otherwise show nothing */}
            {/* {parseInt(userId) !== post.userProfileId || subscription.isSubscribed === 0 ? */}
            <Button onClick={subscribeToAuthor} color="success">Subscribe to this Author</Button>
            {/* : null} */}

            {/* NOT WORKING!! still having issues getting the authorid in time; how do I get this to not be undefined???? */}
            {/* {subscription !== null && subscription.isSubscribed === 1 ? */}
            <Button type="button" onClick={unsubscribe} color="danger">Unsubscribe from this Author</Button>
            {/*: null} */}


            <Link to={`/commentsbypost/${id}`}> <Button>View Comments</Button></Link>
            <Link to={`/comments/add/${id}`}> <Button>Add Comment</Button></Link>

            <Card className="m-4">
                <Row margin="m-4">
                    <h3 className="text-left px-2">Posted by: <strong>{post.userProfile.displayName}</strong></h3>

                </Row>
                <Row margin="m-4">
                    <Col sm="6">
                        <h1>{post.title}</h1>
                    </Col>

                    <Col sm="6">
                        <h3>{post.category.name}</h3>
                    </Col>
                </Row>
                <Row margin="m-4">
                    <Col sm="6">
                        <h3>{post.publishDateTime}</h3>
                    </Col>
                    <Col sm="6">
                        <h3>Estimated Read Time: <strong>{calculateReadTime()}{calculateReadTime() == 1 ? " min" : " mins"}</strong></h3>
                    </Col>
                </Row>
                <CardBody>
                    <CardImg className="postDetailImg" top src={post.imageLocation} alt={post.title} />
                    <p>{post.content}</p>


                </CardBody>

            </Card>

            <h4>Tags: </h4>
            { (postTags.length > 0) ?
                <ListGroup>
                    {

                        postTags.map(postTag => {
                            return <PostTag key={postTag.id} postTag={postTag} />
                        }
                        )
                    }


                </ListGroup>

                :

                null

            }
            <Link to={`/posttag/add/${id}`}>
                <Button type="button" id="addPostTagButton"> Add Tag </Button>
            </Link>


        </>


    );
};

export default PostDetails;