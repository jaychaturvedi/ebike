import RNFetchBlob, { RNFetchBlobConfig } from "rn-fetch-blob";

export function downloadFirmware() {
    const { config, fs } = RNFetchBlob
    let MainBundleDir = fs.dirs.MainBundleDir // this is the pictures directory. You can check the available directories in the wiki.
    console.log(fs.dirs.MainBundleDir)
    console.log(fs.dirs.DocumentDir)
    let options: RNFetchBlobConfig = {
        fileCache: true,
        overwrite: true,
        appendExt: "zip",
        indicator: true,
        path: MainBundleDir + "motovolt/firmware.zip",
        addAndroidDownloads: {
            useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
            notification: false,
            // path: CacheDir + "/motovolt/firmware", // this is the path where your downloaded file will live in
            // description: 'Downloading firmware.'
        }
    }
    config(options).fetch('GET', "https://github.com/securingsincity/react-ace/issues/338").then((res) => {
        // do some magic here
        console.log("File Download Done", MainBundleDir + "motovolt/firmware.zip");
    }).catch(err => {
        console.log(err)
    })
}