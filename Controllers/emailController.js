const config = require('../Config/index');
const nodemailer = require('nodemailer');
const makeEmail = require('../Factory/email');
const makeHttpError = require('../Helpers/makeHttpError');

const controller = {
    sendEmail: async (req, res) =>{

        const userData = req.body;
        try{
            const validEmail = makeEmail(userData);
            const transporter = nodemailer.createTransport({
                pool: true ,
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: config.emailSender,
                    pass: config.emailSenderPassword
                }
             });
     
             const mailOptions = {
                 from: config.emailSender,
                 to: config.emailDestination,
                 subjbect: userData.subject,
                 html: `<div style="display: flex; flex-direction: column; width: 50%;">
                 <div style="background: #B91646; border-radius: 10px; text-align: center;" >
                     <h1 style="color: white;">Congreo UAMM 2021</h1>        
                 </div>
             
                 <div style="display: flex; justify-content: space-between;">
                     <div style="display: flex;">
                         <p>Correo: </p>
                         <p>${validEmail.email}</p>
                     </div>
                     <div style="display: flex; ">
                         <p>Asunto: </p>
                         <p>${validEmail.subject}</p>
                     </div>       
                 </div>
                 <div style="display: flex; justify-content: space-between;">
                     <div style="display: flex;">
                         <p>Telefono: </p>
                         <p>${validEmail.phone}</p>
                     </div>
                     <div style="display:flex; ">
                         <p>Nombre: </p>
                         <p>${validEmail.name}</p>
                     </div>       
                 </div>
                 <div>
                     <h2  style="color: white; background: #B91646; border-radius: 10px; text-align: center;">Mensaje:</h2>
                     <p>${validEmail.body}</p>
                 </div>
             </div>` 
             }

             transporter.sendMail(mailOptions)
             .then((data, err) => {
                 if(data){
                     res.status(200).json({
                         statusCode: 200,
                         message: 'Email sent',
                         data: data
                     })
                     return;
                 }
                 res.status(500).json({
                    statusCode: 200,
                    message: 'There was a problem',
                    data: err
                 })
             })
             .catch(err => {
                 console.log(err);
             });        
        }catch(e){
            makeHttpError(res, e);
        }

       
    }
}

module.exports = controller;