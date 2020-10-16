import { getToken } from "../../authentication";

export const config = {
    baseUrl: "https://evapi.connectm.com"
};

export async function request(url: string, method: string, body?: any) {
    try {
        const tokenRes = await getToken();
        console.log("Token  REceived");
        console.log(tokenRes);
        if (!tokenRes.success) return {
            success: false,
            response: null,
            message: "Invalid token"
        };
        console.log(url)
        console.log(method)
        const response = await fetch(url, {
            method, headers: {
                'Authorization': tokenRes.token!,
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*',
            },

            body: body === undefined ? undefined : JSON.stringify(body),
        }).then(res => {
            console.log("First res : ", res);
            return res.json()
        });
        console.log("Response : ", response)
        if (response.status === "OK")
            return {
                success: true,
                response: response,
                message: "Success"
            }
        return {
            success: false,
            response: null,
            message: response.error.message ? response.error.message : "Unknown Error"
        }
    } catch (error) {
        console.log("Error : ", error)
        return {
            success: false,
            response: null,
            message: error.message ? error.message : "Unknown Error"
        }
    }
}