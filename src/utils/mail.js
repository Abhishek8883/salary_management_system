var nodeoutlook = require('nodejs-nodemailer-outlook')


const send = async (reciever) => {
     nodeoutlook.sendEmail({
        auth: {
            user: "bluedevil8883@outlook.com",
            pass: "Abhishek132@"
        },
        from: 'bluedevil8883@outlook.com',
        to: reciever,
        subject: 'Salary Processed Successfully',
        text: "Your salary details are",
    
        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    }
    );
}


module.exports = send