const User = require('../models/User');

const userStatus = async (req, res, next) => {

// if (req.user) {
//   const currentPage = req.originalUrl;
//   User.findByIdAndUpdate(req.user._id, { 
//     lastLoginDate: new Date(),
//     currentPage: currentPage
//   }, { new: true }).exec();
// }
// next();
// }

  if (req.user) {
    try {
      await User.findByIdAndUpdate(req.user._id, { lastLoginDate: new Date() });
    } catch (error) {
      console.error('Error updating user online check:', error);
    }
  }
  next();
};

module.exports = userStatus;
