const bcrypt = require("bcryptjs");

exports.comparepassword = (password, dbpassword) => {
    return bcrypt.compareSync(password, dbpassword);
};

exports.hashPassword = (password) => {
    const hash = bcrypt.hashSync(password, 8);
    return hash
}