import * as rp from 'request-promise'
// const AWS = require('aws-sdk');

export function createOptions(url: string, body: any, method: "POST" | "GET") {
    const options: rp.Options = {
        url,
        body,
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        json: true // Automatically stringifies the body to JSON
    };
    return options
}

// async function snsMessageConfiguration() {
//     AWS.config.update({ region: 'us-east-1' });
//     var configparams = {
//         attributes: { /* required */
//             'DefaultSMSType': 'Transactional', /* highest reliability */
//             //'DefaultSMSType': 'Promotional' /* lowest cost */
//         }
//     };
//     // Create promise and SNS service object
//     var setSMSTypePromise = new AWS.SNS({ apiVersion: '2010-03-31' }).setSMSAttributes(configparams).promise();
//     return setSMSTypePromise;
// }

// async function sendSMS(phone: string, code: string) {
//     const params = {
//         Message: code, /* required */
//         PhoneNumber: phone,
//     };
//     await snsMessageConfiguration()
//     return new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();
// }

module.exports.preSignUp = async (event: any) => {
    console.log("pre-Configuration event", event)
    const body = {
        "phone_number": event.request.userAttributes.phone_number
    }
    console.log("request body", body)
    // connectM call
    const options = createOptions(process.env.REGISTEREDFRAMEIDFORMOBILEURL!, body, "POST");
    const response: any = await rp(options);
    console.log("frame verification response", response)
    if (response.ec) {
        throw new Error(`${body.phone_number} have not registered any frameId`)
    }
    // event.response.autoConfirmUser = true;
    // event.response.autoVerifyPhone = true;
    return event;
}

module.exports.postConfirmation = async (event: any) => {
    console.log("post confirmation", event)
    const body = {
        "uid": event.userName,
        "phone": event.request.userAttributes.phone_number
    }
    console.log(body)
    const options = createOptions(process.env.CREATEUSERURL!, body, "POST");
    const response = await rp(options);
    console.log(response);
    return event
}

// module.exports.defineAuthChallenge = async (event: any) => {
//     console.log("auth challenge", event.request);

//     // If user is not registered
//     if (event.request.userNotFound) {
//         event.response.issueToken = false;
//         event.response.failAuthentication = true;
//         throw new Error("User does not exist");
//     }
//     if (event.request.session.length >= 3 &&
//         event.request.session.slice(-1)[0].challengeResult === false) { // wrong OTP even After 3 sessions?
//         event.response.issueToken = false;
//         event.response.failAuthentication = true;
//         throw new Error("Invalid OTP");
//     } else if (event.request.session.length > 0 &&
//         event.request.session.slice(-1)[0].challengeResult === true) { // Correct OTP!
//         event.response.issueTokens = true;
//         event.response.failAuthentication = false;
//     } else { // not yet received correct OTP
//         event.response.issueTokens = false;
//         event.response.failAuthentication = false;
//         event.response.challengeName = 'CUSTOM_CHALLENGE';
//     }
//     return event;
// };

// module.exports.createAuthChallenge = async (event: any) => {
//     console.log("CUSTOM_CHALLENGE_LAMBDA", event.request);
//     let secretLoginCode;
//     if (!event.request.session || !event.request.session.length) {
//         // Generate a new secret login code and send it to the user
//         // secretLoginCode = Date.now().toString().slice(-4);
//         secretLoginCode = "1234"
//         // try {
//         //     const msgSentId = await sendSMS(event.request.userAttributes.phone_number, secretLoginCode);
//         //     console.log("msg sent ID", msgSentId);
//         // } catch (error) {
//         //     console.log("sending msg", error)    // Handle SMS Failure   
//         // }
//     } else {
//         // re-use code generated in previous challenge
//         const previousChallenge = event.request.session.slice(-1)[0];
//         secretLoginCode = previousChallenge.challengeMetadata.match(/CODE-(\d*)/)[1];
//     }

//     console.log(event.request.userAttributes);

//     // Add the secret login code to the private challenge parameters
//     // so it can be verified by the "Verify Auth Challenge Response" trigger
//     event.response.privateChallengeParameters = { secretLoginCode };

//     // Add the secret login code to the session so it is available
//     // in a next invocation of the "Create Auth Challenge" trigger
//     event.response.challengeMetadata = `CODE-${secretLoginCode}`;

//     return event;
// };

// module.exports.verifyAuthChallenge = async (event: any) => {
//     console.log(event.request);
//     const expectedAnswer = event.request.privateChallengeParameters.secretLoginCode;
//     if (event.request.challengeAnswer === expectedAnswer) {
//         event.response.answerCorrect = true;
//     } else {
//         event.response.answerCorrect = false;
//     }
//     return event;
// };

module.exports.webAppForgotPassword = async (event: any) => {
    console.log("forgot password",event);
    var CustomMessage_ForgotPassword = `<style>
        p {
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        }
        </style>

        <div id=":x9" class="a3s aXjCH " role="gridcell" tabindex="-1"><p>Hello,</p>
        <p>Follow this link to reset your Password. </p>
        <p><a href="${process.env.WEBAPPSITEURL}/reset-password?confirmation_code=${event.request.codeParameter}&user_name=${event.userName}"> Reset Password </a></p>
        <p>If you didn???t ask to change password, you can ignore this email.</p>
        <p>Thanks,</p>
        <p>Your website team</p>
        </div>`
    if (event.triggerSource === "CustomMessage_ForgotPassword") {
        event.response.emailMessage = CustomMessage_ForgotPassword;
    }
    return event;
};