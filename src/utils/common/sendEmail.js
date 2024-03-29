const nodemailer=require("nodemailer")

const sendEmail = async(subject,message,sendTo,sendFrom,replyTo) =>{

   const transporter = nodemailer.createTransport({
    host : process.env.EMAIL_HOST,
    port : 587,
    auth : {
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD
    },
    tls : {
        rejectUnauthorized : false
    } 
   })

   const options = {
    from : sendFrom,
    to : sendTo,
    replyTo : replyTo,
    subject : subject,
    html : message
   }

   // send email 
   transporter.sendMail(options,function (err,info){
      if(err){
         console.log(err)
      }else{
        console.log(info)
      }
   })
    
}

module.exports = sendEmail