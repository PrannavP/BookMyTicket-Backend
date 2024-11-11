const bcrypt = require("bcryptjs");

const {
    getUserActiveTicketDetails,
    getUserUpcomingEventDetails,
    getTotalMoneySpentByUsers,
    updateAttendeeName,
    updateAttendeeEmail,
    updateAttendeeContactNumber,
    getUserPassword,
    updateUserPassword,
    } = require("../models/UserModel");

// Controller to get users active tickets
const getUserActiveTicketController = async (req, res, next) => {
    try{
        const userId = req.body;

        const userActiveTicketData = await getUserActiveTicketDetails(userId);

        res.json(userActiveTicketData);
    }catch(err){
        next(err);
    };
};

// Controller to get users upcoming booked events
const getUserActiveUpcomingEventController = async (req, res, next) => {
    try{
        const userId = req.body;

        const userUpcomingEventData = await getUserUpcomingEventDetails(userId);

        res.json(userUpcomingEventData);
    }catch(err){
        next(err);
    };
};

// Controller to calculater user spent money
const getUsersTotalSpentController = async (req, res, next) => {
    try{
        const userId = req.body;

        const userTotalSpentData = await getTotalMoneySpentByUsers(userId);

        res.json(userTotalSpentData);
    }catch(err){
        next(err);
    };
};

// Controller to update attendee name
const updateAttendeeNameController = async (req, res, next) => {
    try{
        const { newFullName, userId } = req.body;

        const userDetails = {
            newFullName,
            userId
        };

        // const updatedDetails = await updateAttendeeName(userDetails);

        await updateAttendeeName(userDetails);

        res.json({ message: "Name updated successfully!" });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};

// Controller to update attendee email
const updateAttendeeEmailController = async (req, res, next) => {
    try{
        const { newEmail, userId } = req.body;
        
        const userDetails = {
            newEmail,
            userId,
        };

        // const updatedDetails = await updateAttendeeEmail(userDetails);

        await updateAttendeeEmail(userDetails);

        res.json({ message: "Changed Email Successfully!" });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};

// Controller to update attendee contactnumber
const updateAttendeeContactNumberController = async (req, res, next) => {
    try{
        const { newContactNumber, userId } = req.body;

        const userDetails = {
            newContactNumber,
            userId,
        };

        // const updatedDetails = await updateAttendeeContactNumber(userDetails);
        
        await updateAttendeeContactNumber(userDetails);

        res.json({ message: "Changed Contact Number Successfully." });
    }catch(err){
        res.staus(500).json({ error: err.message });
    }
};

// Controller to update user password
const updateUserPasswordController = async (req, res, next) => {
    const { userId, currentPassword, newPassword } = req.body;

    try{
        // Ensure all fields are provided
        if(!userId || !currentPassword || !newPassword){
            return res.status(400).json({ message: "All fields are required." });
        }

        // Get the user's current hashed password
        const hashedPassword = await getUserPassword(userId);
        if(!hashedPassword){
            return res.status(404).json({ message: "User not found" });
        }

        // Compare current password with hashed password
        const isMatch = await bcrypt.compare(currentPassword, hashedPassword);
        if(!isMatch){
            return res.status(400).json({ message: "Current password is incorrect." });
        }

        // Hash the new password
        const newHashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        await updateUserPassword(userId, newHashedPassword);

        res.json({ message: "Password updated successfully" });
    }catch(err){
        console.log('Error updating password: ', err);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getUserActiveTicketController,
    getUserActiveUpcomingEventController,
    getUsersTotalSpentController,
    updateAttendeeNameController,
    updateAttendeeEmailController,
    updateAttendeeContactNumberController,
    updateUserPasswordController,
};