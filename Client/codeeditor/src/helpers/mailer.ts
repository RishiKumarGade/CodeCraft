import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const sendEmail = async({email,emailType,userId}:any)=>{
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(),10)
        console.log(hashedToken,'hashed token')
        console.log(emailType,'email type')
        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(
                userId,{
                    verifyToken:hashedToken,
                    verifyTokenExpiry:Date.now()+3600000
                }
            )
        }
        else if (emailType === 'RESET'){
            await User.findByIdAndUpdate(
                userId,{
                    forgotPasswordToken:hashedToken,
                    forgotPasswordTokenExpiry:Date.now()+3600000
    })}

    
    console.log(userId.toString())


    var transport = await nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user:"ca9ad067f24111" ,
          pass: "a4242a9430ebcb"
        }
      });
      
      const mailOptions = {
        from:'gaderishi77@gmail.com',
        to:email,
        subject:emailType==='VERIFY'? 'verify your account':'reset password',
        html:`<p>click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>
        <br/> or copy past this in your browser<br/>
       <p> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>
        `
      }
      const mailresponse = await transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        });
      console.log(mailresponse)
      return mailresponse
}
    catch (error:any) {
        return NextResponse.json({error:error.message})
    }
}