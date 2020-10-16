//us-east-2:80f54e71-a2f9-48c8-9b39-3dde366b9410
//arn:aws:iam::447347746650:policy/zelp_quicksite_test
//arn:aws:iam::447347746650:role/amplify-yantraconsole-yconsolenv-155626-authRole
const AWS = require("aws-sdk");
let awsCredentials = {
    region: "us-east-2",
    accessKeyId: "",
    secretAccessKey: ""
};

AWS.config.update(awsCredentials);

let params = {
    RoleArn: "arn:aws:iam::447347746650:role/amplify-yantraconsole-yconsolenv-155626-authRole",
    RoleSessionName: "embeddingsession",
};

let sts = new AWS.STS({
    apiVersion: "2011-06-15"
});

sts.assumeRole(params, (err: any, data: any) => {
    console.log("+++++++Error++++", err)
    AWS.config.update({
        accessKeyId: data.Credentials.AccessKeyId,
        secretAccessKey: data.Credentials.SecretAccessKey,
        sessionToken: data.Credentials.SessionToken
    });

    AWS.config.update({
        region: "us-east-2"
    });

    let quicksight = new AWS.QuickSight({
        apiVersion: '2018-04-01',
        region: 'us-east-2'
    });

    let getdashboardparams = {
        AwsAccountId: "447347746650",
        DashboardId: "ca23ba03-b9b9-4013-982e-7c0ef224e368",
        IdentityType: "QUICKSIGHT",
        ResetDisable: false, // or true, what ever you prefer
        SessionLifeTimeInMinutes: "500",
        UndoRedoDisabled: false, // or true...
        UserArn: "arn:aws:iam::447347746650:role/amplify-yantraconsole-yconsolenv-155626-authRole"
    };

    quicksight.getDashboardEmbedUrl(getdashboardparams, (err: any, data: any) => {
        if (err) console.log("Quicksight GetDashboard Error", err, err.stack);
        else console.log(data);
    });
});