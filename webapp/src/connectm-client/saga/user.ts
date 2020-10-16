
export type Store_UserUpdate = {
    type: "STORE_USER_UPDATE";
    payload: {
        authenticated: boolean,
        user: any
    };
}