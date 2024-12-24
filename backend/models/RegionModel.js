import mongoose from "mongoose";

const regionSchema = mongoose.Schema(
    {
        region_name: {type: String,required: true, unique: true}
    }
)

export const regionModel = mongoose.model('Regions', regionSchema, 'Region_Collection');