const { registerNewOrganizer, getEventsByOrganizer } = require("../models/OrganizerModel");

// Controller to register new organizer
const registerNewOrganizerController = async (req, res, next) => {
    try{
        // console.log('hello aapid');

        const { organizer_name, contact, email, password, address } = req.body;
        const profileImage = req.file ? req.file.filename : null;

        const organizerData = {
            organizer_name,
            contact,
            email,
            password,
            address,
            profile_image:  profileImage,
        };

        const newOrganizer = await registerNewOrganizer(organizerData);

        console.log(profileImage);
        // console.log(newOrganizer);
        
        res.status(200).json({ newOrganizer });
    }catch(err){
        res.status(500).json({ error: err.message });
    };
};

// Controller to get organizer events
const getOrganizerEventsController = async (req, res, next) => {
    try{
        const oName = req.body.organizerName;

        const organizerEvents = await getEventsByOrganizer(oName);
        // console.log(organizerEvents);

        res.status(200).json({ organizerEvents });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    registerNewOrganizerController,
    getOrganizerEventsController,
};