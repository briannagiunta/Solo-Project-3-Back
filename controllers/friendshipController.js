require('dotenv').config()
const jwt = require('jsonwebtoken')
const models = require('../models')

const friendshipController = {}

friendshipController.sendRequest = async (req,res) =>{
    try {
        // create the relationship between logged in user and potential friend
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)

        let friendship = await models.friendship.create({
            // userId: req.body.userId1,
            userId: decryptedId.userId,
            userId2: req.body.userId2,
            accepted: true // true because person making the request wants to be friends
        })
        let friendship2 = await models.friendship.create({
            userId: req.body.userId2,
            userId2: decryptedId.userId,
            // userId2: req.body.userId1,
            accepted: false // false because potential friend has to accept the request to make the relationship
        })
        res.json({message:'request sent', friendship, friendship2})
    } catch (error) {
        res.json({error})
    }
}

friendshipController.getPendingSent = async (req,res)=>{
    try {
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET) 
        let requests = await models.friendship.findAll({
            where: {
                userId2: decryptedId.userId, // userId of loggedInUser
                accepted: false
            },
            include: models.user
        })
        res.json({requests})
    } catch (error) {
        console.log(error);
        res.json({error})
    }
}

friendshipController.getPendingRecieved = async (req,res)=>{
    try {
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET) 
        let requests = await models.friendship.findAll({
            where: {
                userId: decryptedId.userId,
                accepted: false
            }, 
            include: 'friend'
        })
        res.json({requests})
    } catch (error) {
        res.json({error})
    }
}

friendshipController.getFriends = async(req,res)=>{
    try {
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET) 
        let acceptedFriends = await models.friendship.findAll({
            where: {
                userId2: decryptedId.userId,
                accepted: true
            },
            include: 'friend'
        })
        res.json({ acceptedFriends})
    } catch (error) {
        res.json({error})
    }
}

friendshipController.acceptRequest = async (req,res) =>{
    try {
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET) 
        let friendship = await models.friendship.findOne({
            where: {
                userId: decryptedId.userId, // userId of logged in user
                userId2: req.body.userId2 // userId of potential friend
            }
        })
        // friendship between potential friend and loggedin user
        let friendship2 = await models.friendship.findOne({
            where: {
                userId: req.body.userId2, // userId of potential friend
                userId2: decryptedId.userId  // userId of logged in user
            }
        })
        // update both relationships to accepted
        let accepted = await friendship.update({accepted: true})
        let accepted2 = await friendship2.update({accepted: true})
        res.json({message: 'accepted', accepted, accepted2})
    } catch (error) {
        res.json({error})
    }
}

friendshipController.deleteFriend =async (req,res)=>{
    try {
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET) 
        let friendship = await models.friendship.findOne({
            where: {
                userId: decryptedId.userId, // userId of logged in user
                userId2: req.body.userId2 // userId of potential friend
            }
        })
        // friendship between potential friend and loggedin user
        let friendship2 = await models.friendship.findOne({
            where: {
                userId: req.body.userId2, // userId of potential friend
                userId2: decryptedId.userId  // userId of logged in user
            }
        })
        // delete both relationships if one person rejects or unfriends
        let rejected = await friendship.destroy({accepted: false})
        let rejected2 = await friendship2.destroy({accepted: false})
        res.json({rejected, rejected2})
    } catch (error) {
        res.json({error})
    }
}


// app.post('/user/add', async(req,res) => {
//     // create the relationship between logged in user and potential friend
//    let friendship = await models.friendship.create({
//        userId: req.body.userId1,
//        userId2: req.body.userId2,
//        accepted: true // true because person making the request wants to be friends
//    })
//    // create the relationship between potential friend and logged in user
//    let friendship2 = await models.friendship.create({
//        userId: req.body.userId2,
//        userId2: req.body.userId1,
//        accepted: false // false because potential friend has to accept the request to make the relationship
//    })
//    res.json({friendship, friendship2})
// })
// logged in user's outgoing friend requests
// app.post('/user/getpendingrequests', async(req,res) => {
//     let requests = await models.friendship.findAll({
//         where: {
//             userId2: req.body.userId1, // userId of loggedInUser
//             accepted: false
//         },
//         include: models.user
//     })
//     res.json({requests})
// })
// logged in users friend requests from other users 
// app.post('/user/getmyrequests', async(req,res) => {
//     let requests = await models.friendship.findAll({
//         where: {
//             userId: req.body.userId1,
//             accepted: false
//         }, 
//         include: 'friend'
//     })
//     res.json({requests})
// })
// logged in users friends where they've accepted the request
// app.post('/user/getfriends', async(req,res) => {
//     let user = await models.user.findOne({
//         where: {
//             id: req.body.userId1
//         }
//     })
//     // console.log(friends)
//     let acceptedFriends = await models.friendship.findAll({
//         where: {
//             userId: req.body.userId1,
//             accepted: true
//         },
//         include: models.user
//     })
//     res.json({ acceptedFriends})
// })
// how to accept a friend request from another user 
// app.post('/user/acceptfriend', async(req,res) => {
//     // friendship between logged in user and potential friend
//     let friendship = await models.friendship.findOne({
//         where: {
//             userId: req.body.userId1, // userId of logged in user
//             userId2: req.body.userId2 // userId of potential friend
//         }
//     })
//     // friendship between potential friend and loggedin user
//     let friendship2 = await models.friendship.findOne({
//         where: {
//             userId: req.body.userId2, // userId of potential friend
//             userId2: req.body.userId1  // userId of logged in user
//         }
//     })
//     // update both relationships to accepted
//     let accepted = await friendship.update({accepted: true})
//     let accepted2 = await friendship2.update({accepted: true})
//     res.json({accepted, accepted2})
// })
// app.delete('/user/deletefriend', async(req,res) => {
//     // friendship between logged in user and potential friend
//     let friendship = await models.friendship.findOne({
//         where: {
//             userId: req.body.userId1, // userId of logged in user
//             userId2: req.body.userId2 // userId of potential friend
//         }
//     })
//     // friendship between potential friend and loggedin user
//     let friendship2 = await models.friendship.findOne({
//         where: {
//             userId: req.body.userId2, // userId of potential friend
//             userId2: req.body.userId1  // userId of logged in user
//         }
//     })
//     // delete both relationships if one person rejects or unfriends
//     let rejected = await friendship.destroy({accepted: false})
//     let rejected2 = await friendship2.destroy({accepted: false})
//     res.json({rejected, rejected2})
// })





module.exports = friendshipController;