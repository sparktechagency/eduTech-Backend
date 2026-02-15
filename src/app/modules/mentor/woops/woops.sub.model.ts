import { Schema } from "mongoose";
import { IWoopSection } from "./woops.interface";

const WoopSectionSchema = new Schema<IWoopSection>({
    mainData: { 
        type: String, 
        required: true, 
        trim: true 
    },
    detail: { 
        type: String, 
        required: true, 
        trim: true 
    },
    summary: { 
        type: String, 
        required: true, 
        trim: true 
    }
}, { _id: false }); 

export default WoopSectionSchema;