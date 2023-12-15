// =============================== FindDocument ===============================
/**
 * model
 * condition
 */

export const findDocument = async (model, query) => {
    if(!model || !query){
        return {
            msg: "Model or Query is missing",
            status: 400,
            success: false
        }
    }
    const isDocumentExist = await model.findOne(query);
    console.log(isDocumentExist);
    if(!isDocumentExist){
        return {
            msg: "Document Not Found",
            status: 404,
            success: false
        }
    }
    return {
        msg: "Document Found",
        status: 200,
        success: true,
        data: isDocumentExist
    }
}

export const CraeteDocument = async (model, data) => {
    if(!model || !data){
        return {
            msg: "Model or Query is missing",
            status: 400,
            success: false
        }
    }
    const CreatedDocument = await model.create(data);
    console.log(CreatedDocument);
    if(!CreatedDocument){
        return {
            msg: "Document Not Created",
            status: 400,
            success: false
        }
    }
    return {
        msg: "Document Found",
        status: 200,
        success: true,
        data: CreatedDocument
    }
}