categories = [
  "income",
  "restaurant",
  "hospital",
  "drinks",
  "shopping",
  "transport",
  "household",
  "education",
  "smoke",
  "gifting",
  "bills",
  "snacks",
  "movies",
  "others",
];

accounts = ["sbi", "hdfc", "icici", "kotak"];

requestType = {
  POST: "POST",
  GET: "GET",
  PATCH: "PATCH",
  DELETE: "DELETE",
  PUT: "PUT",
};

otpHeadersConstants = {
  contentType: "content-type",
  ContentType: "Content-Type",
  ApplicationJson: "application/json",
  X_RapidAPI_Host: "X-RapidAPI-Host",
  X_RapidAPI_Key: "X-RapidAPI-Key",
};

module.exports = {
  categories,
  accounts,
  requestType,
  otpHeadersConstants,
};
