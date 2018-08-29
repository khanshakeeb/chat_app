const statusCodes = require('../config/statusCodes');
// API response handler to manage resposne object
var responseHandler = {
    successResponse: (message, data, code)=> {
      //Factory method which generate success json response
      return {
        error: null,
        message: message,
        data: data,
        code: code || statusCodes.SUCCESS
      }
    },
    errorResponse: (message, data, code)=> {
      //Factory method which generate error json response
      return {
        error: true,
        message: message,
        data: data,
        code: code || statusCodes.VALIDATION_ERROR
      }
    },
    generatedUserData: (data,token)=>{
      //Factory method which generate user data json response
      return {
        userId: data._id,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        displayName: data.displayName,
        aboutMe: data.aboutMe,
        isActive: data.isActive,
        isOnline: data.isOnline,
        token: token
      }
    }
  }
  module.exports = responseHandler
  