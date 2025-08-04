// Tạo mã code ngẫu nhiên (ví dụ: GV123456)
const generateCode = (prefix = 'GV') => {
  const random = Math.floor(100000 + Math.random() * 900000); // 6 chữ số
  return `${prefix}${random}`;
};

module.exports = generateCode;
