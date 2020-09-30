const AWS = require('aws-sdk');
AWS.config.update({ accessKeyId: 'ACCESSID', secretAccessKey: 'SECRETKEY', region: "us-east-2" });
var CognitoIdentityServiceProvider = AWS.CognitoIdentityServiceProvider;
var client = new CognitoIdentityServiceProvider({ apiVersion: '2016-04-19' });
var params = {
    UserPoolId: 'USERPOOLID',
    Username: 'example@gmail.com',
    DesiredDeliveryMediums: [
        'EMAIL'
    ],
    ForceAliasCreation: false,
    TemporaryPassword: 'password@P123',
    UserAttributes: [
        {
            Name: 'email',
            Value: 'example@gmail.com'
        },
        {
            Name: "custom:role",
            Value: "ADMIN"
        }
        /* more items */
    ]
};
function createUser() {
    client.adminCreateUser(params, (err: { message: any; }, data: { User: any; }) => {
        if (err) {
            console.log("error   ==>", err.message)
        }
        console.log("data", data.User)
    });
}
createUser()