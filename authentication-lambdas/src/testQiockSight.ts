// const AWS = require('aws-sdk');
// let awsCredentials = {
//   region: "us-east-2",
//   accessKeyId: "",
//   secretAccessKey: ""
// };
AWS.config.update(awsCredentials);
function getQuickSightUrl(idToken: any, username: any) {
  //  console.log('Token '+ idToken);
  console.log('called');
  AWS.config.region = 'us-east-2';
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-2:80f54e71-a2f9-48c8-9b39-3dde366b9410",
    Logins: {
      'cognito-idp.us-east-2.amazonaws.com/us-east-2_4yqT9fdQs': idToken
    }
  });
  // console.log(AWS.config.credentials);
  var params = {
    //DurationSeconds: 3600,
    //ExternalId: "123ABC",
    RoleArn: "arn:aws:iam::447347746650:role/amplify-yantraconsole-yconsolenv-155626-authRole",
    RoleSessionName: username
  };
  var sts = new AWS.STS({
    apiVersion: '2011-06-15',
    "region": "us-east-2"
  });
  sts.assumeRole(params, function (err: any, data: any) {
    if (err) console.log("Assumwe erri :::::::::::::::::: ", err, err.stack); // an error occurred
    else {
      // console.log("data: "+data);
      var params = {
        AwsAccountId: '447347746650',
        Email: 'sonu@zelp.io', //used in creating userpool
        IdentityType: 'IAM', //| QUICKSIGHT, /* required */
        Namespace: 'default',
        UserRole: 'READER', //ADMIN | AUTHOR | READER | RESTRICTED_AUTHOR | RESTRICTED_READER, /* required */
        IamArn: "arn:aws:iam::447347746650:role/amplify-yantraconsole-yconsolenv-155626-authRole",
        SessionName: username
      };
      AWS.config.update({
        accessKeyId: data.Credentials.AccessKeyId,
        secretAccessKey: data.Credentials.SecretAccessKey,
        sessionToken: data.Credentials.SessionToken,
        "region": "us-east-2"
      });
      var quicksight = new AWS.Service({
        apiConfig: require("./quicksight-2018-04-01.min.json"),
        region: "us-east-1"
      });
      // let quicksight = new AWS.QuickSight({
      //   apiVersion: '2018-04-01',
      // });
      quicksight.registerUser(params, function (err: any, data: any) {
        if (err) {
          console.log(":::::::::::::::::::::::");
          console.log(JSON.stringify(err));
          if (err.statusCode == 409) {
            // console.log("Register User :::::::::::::::: ", data1);
            quicksight.getDashboardEmbedUrl({
              AwsAccountId: "447347746650",
              DashboardId: "ca23ba03-b9b9-4013-982e-7c0ef224e368",
              IdentityType: "IAM",
              ResetDisabled: true,
              SessionLifetimeInMinutes: 400,
              UndoRedoDisabled: false
            },
              function (err: any, data: any) {
                if (!err) {
                  console.log(Date());
                  console.log(data);
                } else {
                  console.log(err);
                }
              }
            );
          }
          console.log("err register user ::::::::::::::::::", err, err.stack);
        } // an error occurred
        else {
          // console.log("Register User :::::::::::::::: ", data1);
          quicksight.getDashboardEmbedUrl({
            AwsAccountId: "447347746650",
            DashboardId: "ca23ba03-b9b9-4013-982e-7c0ef224e368",
            IdentityType: "IAM",
            ResetDisabled: true,
            SessionLifetimeInMinutes: 400,
            UndoRedoDisabled: false
          },
            function (err: any, data: any) {
              if (!err) {
                console.log(Date());
                console.log(data);
              } else {
                console.log(err);
              }
            }
          );
        }
      });
    }
  });
}

let idToken =""
getQuickSightUrl(idToken, "sonu@zelp.io")