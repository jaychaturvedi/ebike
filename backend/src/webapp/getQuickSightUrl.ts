import * as dotenv from "dotenv"
dotenv.config()
const AWS = require('aws-sdk');
let awsCredentials = {
  region: "us-east-2",
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETKEY
};
AWS.config.update(awsCredentials);

export function getQuickSightUrl(idToken: any, username: any, dashboardId: string) {
  console.log('called');
  AWS.config.region = 'us-east-2';
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-2:80f54e71-a2f9-48c8-9b39-3dde366b9410",
    Logins: {
      'cognito-idp.us-east-2.amazonaws.com/us-east-2_4yqT9fdQs': idToken
    }
  });
  var params = {
    RoleArn: "arn:aws:iam::447347746650:role/amplify-yantraconsole-yconsolenv-155626-authRole",
    RoleSessionName: username
  };
  var sts = new AWS.STS({
    apiVersion: '2011-06-15',
    //change1
    "region": "us-east-1"
  });
  return new Promise((resolve, reject) => {
    sts.assumeRole(params, function (err: any, data: any) {
      let embedUrl;
      if (err) console.log("Assumwe erri :::::::::::::::::: ", err, err.stack); // an error occurred
      else {
        // console.log("data: "+data);
        var params = {
          AwsAccountId: '447347746650',//fixed
          Email: username, //used in creating userpool
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
        let quicksight = new AWS.QuickSight({
          apiVersion: '2018-04-01',
          region: "us-east-1"
        });
        quicksight.registerUser(params, function (err: any, data: any) {
          if (err) {
            console.log(JSON.stringify(err));
            if (err.statusCode == 409) {
              quicksight = new AWS.QuickSight({
                apiVersion: '2018-04-01',
                region: "us-east-2"
              });
              quicksight.getDashboardEmbedUrl({
                AwsAccountId: "447347746650",
                DashboardId: dashboardId,
                IdentityType: "IAM",
                ResetDisabled: true,
                SessionLifetimeInMinutes: 400,
                UndoRedoDisabled: true
              },
                function (err: any, data: any) {
                  if (!err) {
                    console.log(Date());
                    console.log(data, "my new embed url");
                    resolve(data)
                  } else {
                    console.log(err);
                    reject(err)
                  }
                }
              );
            }
            console.log("err register user ::::::::::::::::::", err, err.stack);
          } // an error occurred
          else {
            quicksight = new AWS.QuickSight({
              apiVersion: '2018-04-01',
              region: "us-east-2"
            });
            console.log("Register User :::::::::::::::: =========================>\n", data);
            quicksight.getDashboardEmbedUrl({
              AwsAccountId: "447347746650",
              DashboardId: dashboardId,
              IdentityType: "IAM",
              ResetDisabled: true,
              SessionLifetimeInMinutes: 400,
              UndoRedoDisabled: false
            },
              function (err: any, data: any) {
                if (!err) {
                  console.log(Date());
                  console.log(data, "my embed url");
                  resolve(data)
                } else {
                  reject(err)
                }
              }
            );
          }
        });
      }
    });
  })
}

// getQuickSightUrl(idToken, "sonu@zelp.io")
export async function getEmbedUrl(idToken: string, email: string, dashboardId: string) {
  const result = await getQuickSightUrl(idToken, email, dashboardId)
  console.log(result, "result");
  return result

}

/*
1. user pool  --  application user details
2. identity pool -- quicksight
*/