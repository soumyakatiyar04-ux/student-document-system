const express= require('express');
const documentRouter = express.Router();

const {getDocuments, postDocuments, getElementById, getElementByUserId} = require('../controller/documentController');
const Upload = require('../middleware/uploadMiddleware')

documentRouter.get("/documents/:id", getElementById);
documentRouter.post("/documents/upload", Upload.single("profile") ,postDocuments);
documentRouter.get("/documents" ,getDocuments);
documentRouter.get("/documents/user/:user_id" ,getElementByUserId);


module.exports = documentRouter;