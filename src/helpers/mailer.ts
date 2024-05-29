import User from '@/models/UserModel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'

export const sendEmail = async({email, emailType, userId} : any)=>{
    try{
        const hashedVerifyOrResetToken = await bcryptjs.hash(userId.toString(),10) // could have used uuidv4

        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId,
                {
                    $set:{verifyToken: hashedVerifyOrResetToken , verifyTokenExpiry: Date.now()+3600000} // verifytoken expires after 1 hour
                }
                )
        }else if(emailType === 'RESET'){ // reset password
            await User.findByIdAndUpdate(userId,
                {
                    $set:   {resetToken: hashedVerifyOrResetToken, resetTokenExpiry: Date.now()+3600000} // resettoken expires after 1 hour
                }
            )
        }

        // console.log(emailType)

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "a2945995e6ad0d",
              pass: "ef63cde962ada4"  // use env brother😖
            }
        });

        const mailOptions = {
            from: 'simonsimple305@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password', // Subject line
            // text: "Hello world?", // plain text body
            html: `
                <p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedVerifyOrResetToken}">here</a> to ${emailType==="VERIFY" ? "verify your email" : "reset your password"}
                or copy and paste the link
                <br>
                ${process.env.DOMAIN}/verifyemail?token=${hashedVerifyOrResetToken}
                </p>
                `, // html body
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    }catch(err){

    }
}