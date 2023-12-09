const bcrypt = require("bcrypt");
const mailer = require("nodemailer");
const multer = require("multer");
const exceljs = require("exceljs");
const {unlinkSync} = require("fs")
const { PAGINATION_MAX_RECORD_SIZE, INVALID, OK, ALLOWED_EXTENSIONS, ALLOWED_VIDEO_EXTENSIONS } = require("../constants/constants");
const { IMAGE_NOT_UPLOADED, VIDEO_EXTENSION_NOT_ALLOWED } = require("../constants/messages");



module.exports.uploadImageConfigs = () => {
    let multerStorage = multer.diskStorage({
        destination: "./uploads/",
        filename: (req, file, callback) => {
            let extension = file.originalname.split(".").pop();
            callback(null, Date.now()+"."+extension);
        }
    });
    return multer({storage: multerStorage});
}

module.exports.makeResponse = (message, data=null) => {
    return {
        message: message,
        result: {
            ...data
        }
    }
} 

module.exports.encryptData = async (data) => {
    let salt = await bcrypt.genSalt().catch((e) => {console.log(e)});
    let hashedData="";
    if(salt) hashedData=await bcrypt.hash(data, salt).catch((e) => {console.log(e)});
    return hashedData;
}

module.exports.checkEncryptedData = async (password, hash) => {
    return await bcrypt.compare(password, hash).catch((e) => {console.log(e)});
}

module.exports.sendMail = async (mail, subject, body) => {
    let username=process.env.AUTH_EMAIL;
    let password=process.env.AUTH_PASSWORD;
    const transporter = mailer.createTransport({
        service: "gmail",
        auth: {
            user: username,
            pass: password
        }
    });
    const config={
        from: username,
        to: mail,
        subject: subject,
        text: body
    }
    return await transporter.sendMail(config).catch((e) => {console.log(e)});
}

module.exports.writeExcelFile = async (data=[], fields=[]) => {
    let workbook = new exceljs.Workbook();
    let worksheet = workbook.addWorksheet("sheet 1");
    let row=1, col="A";

    fields.forEach((field, index) => {
        worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+index)}:${row}`).value=field;
    });
    row++;
    data.forEach((row, dataIndex) => {
        fields.forEach((field, fieldIndex) => {
            worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+fieldIndex)}:${row+dataIndex}`).value=row[`${field}`];
        });
    });

    let name_of_file = Date.now()+".xlsx";
    let path = "uploads/"+name_of_file;
    let value = await workbook.xlsx.writeFile(path).catch((e) => {console.log(e)});
    if(!value) return {fileName: name_of_file, path: path};
    return null;
}

module.exports.listData = async (model, pageNum, query) => {
    let start = (PAGINATION_MAX_RECORD_SIZE*(pageNum-1));
    let end = start+PAGINATION_MAX_RECORD_SIZE;

    let value = await model.find({...query}).skip(start).limit(end).catch((e) => {console.log(e)});
    let count = await model.count({...query}).catch((e) => {console.log(e)});

    if(end>count) end=count;

    return {data: value, start:start, end:end, total:count};
}

module.exports.listDataWithPopulate = async (model, pageNum, population_fields=[], query) => {
    let start = (PAGINATION_MAX_RECORD_SIZE*(pageNum-1));
    let end = start+PAGINATION_MAX_RECORD_SIZE;

    let value = await model.find({...query}).skip(start).limit(end).populate(population_fields).catch((e) => {console.log(e)});
    let count = await model.count({}).catch((e) => {console.log(e)});

    if(end>count) end=count;

    return {data: value, start:start, end:end, total:count};
}

module.exports.searchData = async (model, filterText, fieldsBasedOnSearchApplied=[], query={}) => {
    let value = await model.find({...query}).catch((e) => {console.log(e)});

    let data=[];
    value.forEach((elem) => {
        for(let i=0; i<fieldsBasedOnSearchApplied.length; i++){
            let field = elem[`${fieldsBasedOnSearchApplied[i]}`]?.toLowerCase();
            if(field?.includes(filterText)) {
                data.push(elem);
                break;
            }
        }
    });
    return data;
}

module.exports.searchDataWithPopulate = async (model, filterText, fieldsBasedOnSearchApplied=[], population_fields=[], query={}) => {
    let value = await model.find({...query}).populate(population_fields).catch((e) => {console.log(e)});

    let data=[];
    value.forEach((elem) => {
        for(let i=0; i<fieldsBasedOnSearchApplied.length; i++){
            let field = elem[`${fieldsBasedOnSearchApplied[i]}`].toLowerCase();
            if(field.includes(filterText)) {
                data.push(elem);
                break;
            }
        }
    });
    return data;
}

module.exports.checkFile = (fileObject) => {
    if(fileObject){
        let ext = fileObject.originalname.split(".").pop().toLowerCase();
        if(ALLOWED_EXTENSIONS.toLowerCase().includes(ext) || ALLOWED_VIDEO_EXTENSIONS.toLowerCase().includes(ext))
            return {code: OK, data: fileObject.path}
        try{unlinkSync(fileObject.path);}catch(e){}
        return {code: INVALID, data: VIDEO_EXTENSION_NOT_ALLOWED}
    }
    return {code: INVALID, data: IMAGE_NOT_UPLOADED}
}