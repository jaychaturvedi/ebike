import { APIGatewayProxyEvent, Context } from "aws-lambda";
import axios from "axios";

async function make(){
    console.log("Api Call Start Time: ",new Date())
    try{
        const response = await axios.get(process.env.MOTOVOLTAPI! + "/webapp/graphs", {
            params: {
                vehicleId: "069bcc081a68a0832f123",
                alertId: 123,
                alertName: "vehicle active or idle",
                alertTypeId: 1
            }
        })
        console.log("Api Call End Time: ", new Date(), "\n", response.data)
    }catch(e){
        console.log("Errored : ",e, "At",new Date())
    }

}

module.exports.keepAlive = async (event: APIGatewayProxyEvent, context: Context) => {
    console.log("Keep Alive Event",event )
    await make()
    const response = {
        statusCode: 200,
        headers: {
            "x-custom-header": "user_creation"
        },
        body: JSON.stringify({ status: "ok", date: new Date() }),
        isBase64Encoded: false
    };
    console.log("Done",new Date())
    context.succeed(response)
};