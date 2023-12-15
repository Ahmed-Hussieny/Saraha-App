// send json response after controller file
export const globalResponse = (err, req, res, next) => {
    if(err){
        return res.status(err['cause'] || 500).json({
            message:err.message,
            errorLocation:err.stack,
        })
    }
}