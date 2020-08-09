import { getToken } from "../../authentication";

export const config = {
    baseUrl: "https://q6sm9vkbn2.execute-api.us-east-2.amazonaws.com/dev"
};

export async function request(url: string, method: string, body?: any) {
    try {
        const tokenRes = await getToken();
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
                'Content-Type': 'application/json'
            },
            body: body ?? JSON.stringify(body),
        }).then(res => res.json());
        console.log("Response : ", response)
        if (response.status === "OK")
            return {
                success: true,
                response: response,
                message: "Success"
            }
        throw new Error(response.error)
    } catch (error) {
        console.log("Error : ", error)
        return {
            success: false,
            response: null,
            message: error.message ? error.message : "Unknown Error"
        }
    }
}