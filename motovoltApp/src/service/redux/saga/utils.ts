import { getToken } from "../../authentication";

export const config = {
    baseUrl: "https://evapi.connectm.com",
    yantraBaseUrl: "https://fwvwsm1jsh.execute-api.us-east-2.amazonaws.com",
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

export async function yantraRequest(url: string, method: string, body?: any) {
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
                'Authorization': `Bearer ${tokenRes.token!}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*',
            },

            body: body === undefined ? undefined : JSON.stringify(body),
        }).then(res => {
            console.log("First res : ", res);
            return res.json()
        });
        console.log("Response : ", response)
        if (response.st !== "false")
            return {
                success: true,
                response: { body: response },
                message: "Success"
            }
        return {
            success: false,
            response: null,
            message: response.em ? response.em : "Unknown Error"
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