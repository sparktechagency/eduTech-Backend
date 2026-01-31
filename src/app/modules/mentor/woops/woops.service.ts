import { IWoopGoal } from "./woops.interface";
import { WoopGoal } from "./woops.model";


const createwoopFromDB = async (payload: IWoopGoal) => {
    const woop  = await WoopGoal.create(payload);
    if (!woop) {
        throw new Error('Failed to create WOOP goal');
    }
    return woop;
}

const getUserWoopsFromDB = async (userId: string) => {
    const result = await WoopGoal.find({ userId })
        .populate('userId') 
        .sort({ createdAt: -1 }); 

    return result;
};

const getWoopByIdFromDB = async (id: string) => {
    const result = await WoopGoal.findById(id)
        .populate('userId'); 

    return result;
};

const getAllUserWoopsFromDB = async () => {
    const result = await WoopGoal.find()
        .populate('userId') 
        .sort({ createdAt: -1 }); 

    return result;
};

const getWoopsIdsFromDB = async (ids: string[]) => {
    const objectIds = ids.map(id => id.trim());
    const result = await WoopGoal.find({ _id: { $in: objectIds } })
        .populate('userId') 
        .sort({ createdAt: -1 }); 

    return result;
}

const updateWoopFromDB = async (id: string, payload: IWoopGoal) => {
    const result = await WoopGoal.findByIdAndUpdate(
        id, payload, 
        {
             new: true, 
            runValidators: true
            }
        );
    return result;
};

const deleteWoopFromDB = async (id: string) => {
    const cleanId = id.trim();
    const result = await WoopGoal.findByIdAndDelete(cleanId);

    if (!result) {
        throw new Error('WOOP goal not found');
    }
}

export const WoopService = {
    createwoopFromDB,
    getUserWoopsFromDB,
    getWoopByIdFromDB,
    getAllUserWoopsFromDB,
    updateWoopFromDB,
    deleteWoopFromDB,
    getWoopsIdsFromDB
};