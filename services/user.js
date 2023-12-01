const UserModel = require("../models/User");
const constantMsgs=require("../constants/messages");
const {PAGINATION_MAX_RECORD_SIZE}=require("../constants/constants");
const bcrypt = require("bcrypt");
const exceljs = require("exceljs");


module.exports.store = async (userObject) => {
    if(!userObject.username) {return {isError:true, data: "Username is empty"}};
    if(!userObject.fullName) {return {isError:true, data: "Full Name is empty"}};
    if(!userObject.password) {return {isError:true, data: "Password is empty"}};
    if(!userObject.email) {return {isError:true, data: "Email is empty"}};
    
    if(userObject.password){
        let salt = await bcrypt.genSalt().catch((e) => {console.log(e)});
        if(salt){
            let hashedPassword = await bcrypt.hash(userObject.password, salt).catch((e) => {console.log(e)});
            if(hashedPassword) userObject.password=hashedPassword;
        }else{
            return {isError:true, data: constantMsgs.UNEXPECTED_ERROR};
        }
    }

    let value = await UserModel.findOne({email: userObject.email}).catch((e) => {console.log(e)});
    let value2=await UserModel.find({role: "Admin"}).catch((e) => {console.log(e)});
    
    if(value2.length>0){ userObject.role="User" }
    else{ userObject.role="Admin" }

    if(value){ return {isError:true, data:constantMsgs.USER_ALREADY_EXIST} }
    else{
        let result = await new UserModel(userObject).save().catch((e) => {console.log(e)});
        if(!result){ return {isError: true, data:constantMsgs.UNEXPECTED_ERROR}}
    }
    return {isError:false, data: constantMsgs.USER_ADDED};
}

module.exports.update = async (email, objToEdit) => {
    let keys = Object.keys(objToEdit);
    if(keys.length<=0 || !email)
        return constantMsgs.FIELD_EMPTY;


    if(objToEdit?.password){
        let salt = await bcrypt.genSalt().catch((e) => {
            console.log(e);
        });
        if(salt){
            let hashedPassword = await bcrypt.hash(objToEdit.password, salt).catch((e) => {
                console.log(e);
            });
            if(hashedPassword){
                objToEdit.password=hashedPassword;
            }
        }
    }

    let returnStatus=constantMsgs.USER_UPDATED;
    let result = await UserModel.updateOne({email: email}, objToEdit).catch((e) => {
        returnStatus=constantMsgs.UNEXPECTED_ERROR;
        console.log(e);
    });
    if(!result.modifiedCount)
        returnStatus = constantMsgs.UNEXPECTED_ERROR;
    return returnStatus;
}

module.exports.delete = async (email) => {
    if(!email)
        return constantMsgs.FIELD_EMPTY;

    let returnStatus=constantMsgs.USER_DELETED;
    let result = await UserModel.updateOne({email: email}, {$set: {deletedAt: Date.now()}}).catch((e) => {
        returnStatus=constantMsgs.UNEXPECTED_ERROR;
        console.log(e);
    });
    if(!result.modifiedCount)
        returnStatus = constantMsgs.USER_NOT_FOUND;
    return returnStatus;
}

module.exports.show = async (email) => {
    if(!email)
        return constantMsgs.FIELD_EMPTY;

    let result = await UserModel.findOne({email: email}).catch((e) => {
        console.log(e);
    });
    return result;
}

module.exports.list = async (page_number=1) => {
    let value = await UserModel.find({}).catch((e) => {
        console.log(e);
    });
    
    let startingIndex=(PAGINATION_MAX_RECORD_SIZE*(page_number-1));   
    let data=[];
    if(startingIndex<value.length){
        for(let i=0; (i<startingIndex+PAGINATION_MAX_RECORD_SIZE && i<value.length); i++){
            data.push(value[i]);
        }
    }
    return data;
}

module.exports.searchData = async (searchText) => {
    let value = await UserModel.find().catch((e) => {
        console.log(e);
    });
    
    let data=[];

    value.forEach((elem) => {
        if(elem.fullName.includes(searchText) || elem.userName.includes(searchText) || elem.email.includes(searchText) || elem.about.includes(searchText)){
            data.push(elem);
        }
    });

    return data; 
}

module.exports.changePassword = async (data) => {
    if(!(data.email && data.oldPassword && data.newPassword && data.confirmPassword))
        return constantMsgs.FIELD_EMPTY;
    if(data.newPassword!==data.confirmPassword)
        return constantMsgs.NEW_AND_CONFIRM_PASSWORD_ERROR;
    

    
    let value = await UserModel.findOne({email:data.email}).catch((e) => {
        console.log(e);
    });
    
    if(value){
        let result = await bcrypt.compare(data.oldPassword, value.password).catch((e) => {
            console.log(e);
        })
        if(result){
            let salt = await bcrypt.genSalt();
            let hashedpassword=await bcrypt.hash(data.newPassword, salt).catch((e) => {
                console.log(e);
            });
            if(hashedpassword){
                let value = await UserModel.updateOne({email: data.email}, {password: hashedpassword}).catch((e) => {
                    console.log(e);
                });
                if(value.modifiedCount)
                    return constantMsgs.PASSWORD_CHANGED;
                return constantMsgs.PASSWORD_NOT_CHANGED;
            }
        }
        return constantMsgs.INVALID_PASSWORD;
    }
    return constantMsgs.USER_NOT_FOUND;
}

module.exports.uploadProfilePhoto = async (email, path) => {
    if(!(email && path))
        return constantMsgs.FIELD_EMPTY;

    let value = await UserModel.updateOne({email: email}, {profilePhoto: path}).catch((e) => {
        console.log(e);
    });

    if(value.modifiedCount){
        return constantMsgs.USER_UPDATED;
    }
    return constantMsgs.USER_NOT_FOUND;
}

module.exports.uploadCoverPhoto = async (email, path) => {
    if(!(email && path))
        return constantMsgs.FIELD_EMPTY;

    let value = await UserModel.updateOne({email: email}, {coverPhoto: path}).catch((e) => {
        console.log(e);
    });

    if(value.modifiedCount){
        return constantMsgs.USER_UPDATED;
    }
    return constantMsgs.USER_NOT_FOUND;
}


module.exports.downloadExcel = async (res) => {
    let workbook = new exceljs.Workbook();

    let val = await UserModel.find().catch((e) => {
        console.log(e);
    });
    if(!val)
        return constantMsgs.NO_DATA;

    let worksheet = workbook.addWorksheet("sheet 1");
    let row=1, col="A";
    worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+0)}:${row}`).value="Name"
    worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+1)}:${row}`).value="Username"
    worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+2)}:${row}`).value="Email"
    worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+3)}:${row}`).value="Credits"
    worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+4)}:${row}`).value="Role"
    worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+5)}:${row}`).value="About"

    val.forEach((elem, index) => {
        worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+0)}:${row+index+1}`).value=elem.fullName;
        worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+1)}:${row+index+1}`).value=elem.userName
        worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+2)}:${row+index+1}`).value=elem.email;
        worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+3)}:${row+index+1}`).value=elem.balance;
        worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+4)}:${row+index+1}`).value=elem.role;
        worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+5)}:${row+index+1}`).value=elem.about;
    });

    let name_of_file = "./uploads/"+Date.now()+".xlsx";
    let value = await workbook.xlsx.writeFile(name_of_file).catch((e) => {
        console.log(e);
    });
    return name_of_file;
}