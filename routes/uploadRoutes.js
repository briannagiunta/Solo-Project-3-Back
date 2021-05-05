// const multerUploads = require('../middlewares/multer');
// const { multerUploads, dataUri } = require('../middlewares/multer');
// const express = require('express');
// const uploadRoutes = express.Router();
// const { urlencoded, json } = require('body-parser')
// const { resolve } = require('path')
// const { uploader, cloudinaryConfig } = require('../config/cloudinaryConfig')
// import { resolve } from  'path';
// import { uploader, cloudinaryConfig } from './config/cloudinaryConfig'
// import { multerUploads, dataUri } from './middlewares/multerUpload';

// app.use(urlencoded({ extended: false }));
// app.use('*', cloudinaryConfig);
// app.get('/*', (req, res) => res.sendFile(resolve(__dirname, '../public/index.html')));

// uploadRoutes.post('/upload', multerUploads, (req, res) => {
//     if(req.file) {
//         const file = dataUri(req).content;
//         return uploader.upload(file).then((result) => {
//         const image = result.url;
//         return res.status(200).json({
//         messge: 'Your image has been uploded successfully to cloudinary',
//         data: {
//         image
//         }
//         })
//         }).catch((err) => res.status(400).json({
//         messge: 'someting went wrong while processing your request',
//         data: {
//         err
//         }
//         }))
//         }
//         });
        
    // console.log('req.body :', req.body);
//     console.log('req.file : ', req.file);
// });

// module.exports = uploadRoutes;    