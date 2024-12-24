import mongoose from "mongoose";

const topicSchema = mongoose.Schema(
    {
        topic_name: {type: String,required: true, unique: true}
    }
)

export const topicModel = mongoose.model('Topics', topicSchema, 'Topic_Collection');