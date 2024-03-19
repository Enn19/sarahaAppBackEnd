
import messageModel from '../../../DB/models/message.model.js';
import userModel from '../../../DB/models/user.model.js';
import flash from 'express-flash';
//send message 
export const sendMessage = async (req, res, next) => {
    const { id } = req.params;
    const { message } = req.body;
    const user = await userModel.findById({ _id: id });
    if (!user) {
        req.flash("status", "invalid");
        return res.redirect(`/user/shareProfile/${id}`);
    }

    const addMessage = await messageModel({ message, recevideId: id });
    await addMessage.save();
    await userModel.findByIdAndUpdate({ _id: id }, { $push: { messages: addMessage._id } });

    req.flash("status", "done");
    return res.redirect(`/user/shareProfile/${id}`);
};
//delete message 
export const deleteMessage = async (req, res, next) => {
    const { id } = req.params
    await messageModel.deleteOne({ _id: id, receivedId: req.session.user._id })
    await userModel.findByIdAndUpdate({ _id: req.session.user._id }, { $pull: { messages:id} })
    return res.redirect(`/user/profile`);
}


