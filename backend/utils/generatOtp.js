const master_otp_model = require("../models/master_otp_model");

exports.generate_Otp = async (limit, uuid) => {
  const digits = "0123456789";
  let OTP = "";

  for (let i = 0; i < limit; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }

  let existingOTP = await master_otp_model.findOne({ user_uuid: uuid });

  if (existingOTP) {
    existingOTP.otp = OTP;
    existingOTP.master_otp_modifed_date = Date.now();

    await existingOTP.save();
  } else {
    const otp_data_length = await master_otp_model.countDocuments();
    const otp_data = await master_otp_model.create({
      otp_id: otp_data_length === 0 ? 1 : otp_data_length + 1,
      otp: OTP,
      user_uuid: uuid,
      master_otp_modifed_date: Date.now(),
    });
  }

  return OTP;
};

exports.verify_otp = async (otp, uuid) => {

  const otp_details = await master_otp_model.findOne({ user_uuid: uuid });
  const otp_modifed_date = new Date(otp_details.master_otp_modifed_date);
  const currentTime = new Date();
  const time_Difference = currentTime - otp_modifed_date;
  const minutes_Difference = time_Difference / (1000 * 60);

  let is_valid = false;
  if (minutes_Difference > 5) {
    throw new Error("OTP is expired");
  }
  is_valid = otp_details && otp_details.otp === Number(otp) ? true : false;
  if (is_valid) {
    otp_details.master_otp_status = "Active";
    await otp_details.save();
  }
  return is_valid;
};
