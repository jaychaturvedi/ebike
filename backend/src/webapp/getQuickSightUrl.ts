import * as dotenv from "dotenv"
import JwtDecode from "jwt-decode";
dotenv.config()
const AWS = require('aws-sdk');
let awsCredentials = {
  region: process.env.REGION,
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETKEY
};
AWS.config.update(awsCredentials);

export function getQuickSightUrl(idToken: any, username: any, dashboardId: string, userGroup: string) {
  console.log('called');
  AWS.config.region = process.env.REGION;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.QUICKSIGHTIDENTITYPOOLID,
    Logins: {
      [`cognito-idp.${process.env.REGION}.amazonaws.com/${process.env.WEBAPPUSERPOOLID}`]: idToken
    }
  });
  var params = {
    RoleArn: `arn:aws:iam::${process.env.AWSACCOUNTID}:role/${process.env.QUICKSIGHTAUTHROLE}`,
    RoleSessionName: username
  };
  var sts = new AWS.STS({
    apiVersion: '2011-06-15',
    "region": "us-east-1"
  });
  return new Promise((resolve, reject) => {
    sts.assumeRole(params, function (err: any, data: any) {
      let embedUrl;
      if (err) console.log("Assumwe erri :::::::::::::::::: ", err, err.stack); // an error occurred
      else {
        // console.log("data: "+data);
        var params = {
          AwsAccountId: process.env.AWSACCOUNTID,//fixed
          Email: username, //used in creating userpool
          IdentityType: 'IAM', //| QUICKSIGHT, /* required */
          Namespace: 'default',
          UserRole: 'ADMIN', //ADMIN | AUTHOR | READER | RESTRICTED_AUTHOR | RESTRICTED_READER, /* required */
          IamArn: `arn:aws:iam::${process.env.AWSACCOUNTID}:role/${process.env.QUICKSIGHTAUTHROLE}`,
          SessionName: username
        };
        AWS.config.update({
          accessKeyId: data.Credentials.AccessKeyId,
          secretAccessKey: data.Credentials.SecretAccessKey,
          sessionToken: data.Credentials.SessionToken,
          "region": process.env.QUICKSIGHTREGION
        });
        let quicksight = new AWS.QuickSight({
          apiVersion: '2018-04-01',
          region: process.env.QUICKSIGHTREGION
        });
        quicksight.registerUser(params, function (err: any, data: any) {
          if (err) {
            // console.log(JSON.stringify(err));
            if (err.statusCode == 409) {
              quicksight = new AWS.QuickSight({
                apiVersion: '2018-04-01',
                region: process.env.REGION
              });
              quicksight.createGroupMembership({
                AwsAccountId: process.env.AWSACCOUNTID,
                Namespace: 'default',
                GroupName: userGroup,
                MemberName: username,
              }, function (err: any, data: any) {
                if (err) console.log(err, err.stack); // an error occurred
                else console.log(data);           // successful response
              });
              quicksight.getDashboardEmbedUrl({
                AwsAccountId: process.env.AWSACCOUNTID,
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
                    // console.log(err);
                    reject(err)
                  }
                }
              );
            }
            // console.log("err register user ::::::::::::::::::", err, err.stack);
          } // an error occurred
          else {
            quicksight = new AWS.QuickSight({
              apiVersion: '2018-04-01',
              region: process.env.REGION
            });
            console.log("Register User :::::::::::::::: =========================>\n", data);
            quicksight.createGroupMembership({
              AwsAccountId: process.env.AWSACCOUNTID,
              Namespace: 'default',
              GroupName: userGroup,
              MemberName: username,
            }, function (err: any, data: any) {
              if (err) console.log(err, err.stack); // an error occurred
              else console.log(data);           // successful response
            });
            quicksight.getDashboardEmbedUrl({
              AwsAccountId: process.env.AWSACCOUNTID,
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
  const decodedToken: any = JwtDecode(idToken)
  const userRole = decodedToken["custom:role"]
  const userGroup = decodedToken["custom:group"]
  const result = await getQuickSightUrl(idToken, email, dashboardId, userGroup)
  console.log(result, "result");
  return result

}

/*
1. user pool  --  application user details
2. identity pool -- quicksight
*/