const Teacher = require('../models/Teacher');

const generateUniqueTeacherId = async () => {
  let code;
  let exists = true;

  while (exists) {
    code = Math.floor(1000000000 + Math.random() * 9000000000).toString(); // 10 chữ số
    exists = await Teacher.findOne({ code });
  }

  return code;
};

module.exports = generateUniqueTeacherId;
