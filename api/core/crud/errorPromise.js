export default (message, status) => {
    return new Promise((resolve, reject) => {
        reject({
            message,
            status
        });
    })
}
