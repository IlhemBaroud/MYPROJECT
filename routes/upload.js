const express = require("express")
const router = express.Router()

router.post("/", (req, res) => {
    if(req.file===null){
        return res.status(400).json({msg:'No file uploaded'})
    }
    const file=req.files.file   
    file.mv(`${__dirname}/frontend/public/upload/${file.name}`, (err) => {
      
        if (err) {
        res.status(500).send({ message: "File upload failed", code: 200 });
      }
      
    //   res.status(200).send({ message: "File Uploaded", code: 200 });
      res.json({fileName:file.name, filePath: `uploads/${file.name}`})
    });
  });

  module.exports = router