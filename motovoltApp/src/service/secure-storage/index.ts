import * as Keychain from 'react-native-keychain';

export async function storeCredentials(username: string, password: string) {
    const response = await Keychain.setGenericPassword(username, password);
    console.log(response)
    return response || false;
};

export async function fetchCredentials() {
    const credentials = await Keychain.getGenericPassword();
    console.log(credentials)
    return credentials;
};

export async function resetCredentials() {
    const response = await Keychain.resetGenericPassword();
    console.log(response);
    return response;
}