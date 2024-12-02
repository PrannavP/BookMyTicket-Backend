const pool = require("../config/dbConfig");

// function to comment in event
const postCommentinEvent = async(eventID, userID, commentText) => {
    try{
        const query = "INSERT INTO event_comments (event_id, user_id, comment_text) VALUES ($1, $2, $3) RETURNING *";
        const values = [eventID, userID, commentText];
        const { rows } = await pool.query(query, values);
        return rows;
    }catch(err){
        throw new Error("Error while posting comment");
    }
};

// function to get event comments with users
const getEventComments = async(eventID) => {
    try{
        const query = `
            SELECT ec.comment_text, ec.commented_at, u.full_name AS commenter_name
            FROM event_comments ec
            JOIN users u ON ec.user_id = u.user_id 
            WHERE ec.event_id = $1
            ORDER BY ec.commented_at DESC
        `;
        const values = [eventID];
        const { rows } = await pool.query(query, values);
        return rows;
    }catch(err){
        throw new Error("Error while getting event comments");
    }
};

module.exports = {
    postCommentinEvent,
    getEventComments
};