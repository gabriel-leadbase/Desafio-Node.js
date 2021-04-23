const mongoose = require('mongoose');
const Permission = mongoose.model('Permission');

exports.create = async (data) => {
    var permission = new Permission(data);
    await permission.save();
}


// exports.delete = async (name) => {
//     var permission = await permission.findOneAndRemove({name: name});
// }