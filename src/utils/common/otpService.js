const { requestType,otpHeadersConstants } = require("./enums");
const { ServerConfig } = require("../../config");
const axios = require("axios");
const { data } = require("./error-response");

const options = {
  method: requestType.POST,
  url: ServerConfig.OTP_URL,
  headers: {
    [otpHeadersConstants.contentType]: otpHeadersConstants.ApplicationJson ,
    [otpHeadersConstants.ContentType]: otpHeadersConstants.ApplicationJson,
    Authorization: "Apikey eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkYTRkZjU0MC1kN2EyLTExZWUtOTQ2MS02NzA4NzUxYzExODkiLCJzdWIiOiJTSE9VVE9VVF9BUElfVVNFUiIsImlhdCI6MTcwOTI4MDQ5NCwiZXhwIjoyMDI0ODEzMjk0LCJzY29wZXMiOnsiYWN0aXZpdGllcyI6WyJyZWFkIiwid3JpdGUiXSwibWVzc2FnZXMiOlsicmVhZCIsIndyaXRlIl0sImNvbnRhY3RzIjpbInJlYWQiLCJ3cml0ZSJdfSwic29fdXNlcl9pZCI6IjU3NDg5OCIsInNvX3VzZXJfcm9sZSI6InVzZXIiLCJzb19wcm9maWxlIjoiYWxsIiwic29fdXNlcl9uYW1lIjoiIiwic29fYXBpa2V5Ijoibm9uZSJ9.hzwUBHMqX3mNFPCCCle5NaFqroUjOnNZxDiHrgY_CBc",
    [otpHeadersConstants.X_RAPIDAPI_KEY]: ServerConfig.X_RAPIDAPI_KEY,
    [otpHeadersConstants.X_RAPIDAPI_HOST]: ServerConfig.X_RAPIDAPI_HOST,
  },
  data : {}
};

async function sendOtp(req) {
  try {
    const data = {
      content: {
        sms: `${req.body.name}! Please use this ${{
          code,
        }} for account signup`,
      },
      destination: `${req.body.phone}`,
      source: "ShoutDEMO",
      transport: "sms",
    }
    options.data=data
    const response = await axios.request(options);
    console.log(response.data);
    return response.data
  } catch (error) {
    console.error(error);
  }
}



async function verifyOtp(code) {
  try {
    data= {
      code: code,
      referenceId: "cc921780-8547-11ea-ada2-d52axxxxxx"
    }
    options.data=data
    const response = await axios.request(options);
    return response.data
  } catch (error) {
    console.error(error);
  }
}

module.exports = { sendOtp, verifyOtp };
