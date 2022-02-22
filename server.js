//Configuration
const express= require("express")

const app = express()
const bodyParser = require("body-parser")
const handlebars = require("express-handlebars")
const nodemailer = require("nodemailer");
const fileupload = require("express-fileupload");
const path = require("path")
const engine = handlebars.engine

var cors = require('cors')

app.use(fileupload());
app.use(express.static("files"));
app.use(cors()) 

// global.__basedir = __dirname;

const dotenv=require("dotenv")

const Vonage = require('@vonage/server-sdk')

//View engine setup
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Body-parse middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Static forlder
app.use('/public', express.static(path.join(__dirname, 'public')));
//Required files
const category = require('./routes/category.js')
const course =require('./routes/course.js')
const user = require('./routes/user.js')
const session = require('./routes/session.js')
const auth = require('./routes/auth.js')
const agenda = require('./routes/agenda.js')
const town = require('./routes/town.js')
// const upload = require("./routes/upload.js");

require('./connectDB')

app.use('/api/course', course)
app.use('/api/category', category)
app.use('/api/session', session)
app.use('/api/user', user)
app.use('/api/auth', auth)
app.use('/api/agenda', agenda)
app.use('/api/town', town)
// app.use('/api/upload', upload)

app.get('api/contact', (req, res)=>{
    res.render('contact', {layout : false})
})

app.get('api/sms', (req, res)=>{
    res.render('sms', {layout : false})
})

let vonage = new Vonage({
    apiKey: process.env.VONAGE_KEY,
    apiSecret: process.env.VONAGE_SECRET
})


app.post('api/sms', (request, response)=>{
    dotenv.config({path:'./Config/.env'})
    let from = "RJ WEB"
    let to = request.body.to
    let text = request.body.message

vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
        console.log(err);
    } else {
        if(responseData.messages[0]['status'] === "0") {
            response.render('sms',{msg:"Message sent successfully."});
        } else {
            response.render('sms',{msg:`Message failed with error: ${responseData.messages[0]['error-text']}`});
        }
    }
})

})
    

app.post('api/send', async (request, response)=>{

    const output =
    `<p>You have a new contact</p>
    <h3>Contact details</h3>
    <ul>
        <li>Contact name : ${request.body.name}</li>
        <li>Company : ${request.body.company}</li>
        <li>Phone : ${request.body.phone}</li>
        <li>E-mail : ${request.body.email}</li>
    </ul>`

    //create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(
    {
        service : "gmail",
      auth: {
        user : 'ilhem.baroud21@gmail.com', // generated ethereal user
        pass: 'bingoo8974', // generated ethereal password
      },
      tls: {
          rejectUnauthorized: false
      }
    });
  
    // send mail with defined transport object
    var mailOptions = {
      from: 'ilhem.baroud@gmail.com', // sender address
      to: request.body.email, // list of receivers
      subject: request.body.subject, // Subject line
      text: request.body.message, // plain text body
      html: output, // html body
    }
    transporter.sendMail(mailOptions,(error, info)=>{
        if(error) {
            return console.log(error)
        } 
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    response.render('contact', {msg:'Email was sent'})
    }) 
})

app.post("/api/upload", (req, res) => {
    console.log('CHEMIN : ', __dirname)
      if(req.file===null){
          return res.status(400).json({msg:'No file uploaded'})
      }
      const file=req.files.file   
      file.mv(`${__dirname}/frontend/public/uploads/${file.name}`, (err) => {
        
          if (err) {
          res.status(500).send({ message: "File upload failed", code: 200 });
        }
        
      //   res.status(200).send({ message: "File Uploaded", code: 200 });
        res.json({fileName:file.name, filePath: `uploads/${file.name}`})
      });
    });
  

app.listen("5000", (error)=>{
    if (error) {
        console.log('Server error')
    }
    else {
        console.log('Server running on port 5000')    
    }
    
})