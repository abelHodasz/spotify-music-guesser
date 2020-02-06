


export default function myLog(err, sender) {
    try {
        console.log("Error in "+ sender +" !!!")
        console.log(JSON.parse(err.response).error.message);
    } catch {
        console.log(err);
    }
}
