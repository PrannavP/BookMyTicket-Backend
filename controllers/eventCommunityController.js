const { getEventComments, postCommentinEvent } = require("../models/eventCommunityModel");

// Controller to post comment
const commentInEventController = async(req, res, next) => {
    try{
        const { eventID, userID, commentText } = req.body;
        const postComment = await postCommentinEvent(eventID, userID, commentText);
        res.json(postComment);
    }catch(err){
        throw(err);
    }
};

// Controller to get event's comments
const getEventCommentsController = async(req, res, next) => {
    try{
        const eventID = req.body.eventID;
        const eventComments = await getEventComments(eventID);
        res.json(eventComments);
    }catch(err){
        throw(err);
    }
};

module.exports = {
    commentInEventController,
    getEventCommentsController
}