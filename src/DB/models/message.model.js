import { Schema,Types,model } from "mongoose";

const messageSchema=new Schema({
    message: {
        type: String,
        required: true
    },
    recevideId: {
        type: Schema.Types.ObjectId, // Assuming it's a reference to another user
        required: true
    }}
,{
    timestamps:true
})

const messageModel =model("Message",messageSchema)
export default messageModel   