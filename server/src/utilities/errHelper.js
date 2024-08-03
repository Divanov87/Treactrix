exports.getErr = (err) => {
    let errMessage = err.message;
    if (err.errors) {
        errMessage = Object.values(err.errors)[0].message;
    }
    console.log(errMessage)
    return errMessage;
}
