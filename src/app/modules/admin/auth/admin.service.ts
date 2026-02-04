import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../../errors/ApiError';
import { IUser } from '../../user/user.interface';
import { User } from '../../user/user.model';
import { Reservation } from '../../reservation/reservation.model';
import QueryBuilder from '../../../../shared/apiFeature';
import { Event } from '../event/event.model';
import { LearningMaterial } from '../../mentor/lmetarial/learning.model';
import { Assignment } from '../../(teacher)/assignment/assignment.model';

const createAdminToDB = async (payload: IUser): Promise<IUser> => {
    const createAdmin: any = await User.create(payload);
    if (!createAdmin) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create Admin');
    }
    if (createAdmin) {
        await User.findByIdAndUpdate(
            { _id: createAdmin?._id },
            { verified: true },
            { new: true }
        );
    }
    return createAdmin;
};

const deleteAdminFromDB = async (id: any): Promise<IUser | undefined> => {
    const isExistAdmin = await User.findByIdAndDelete(id);
    if (!isExistAdmin) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to delete Admin');
    }
    return;
};

const getAdminFromDB = async (): Promise<IUser[]> => {
    const admins = await User.find({ role: 'ADMIN' })
        .select('name email profile contact location');
    return admins;
};

const getTotalUsersByRoleFromDB = async (): Promise<{ totalStudents: number; totalTeachers: number; totalMentors: number; totalCoordinators: number; total: number }> => {
    const totalStudents = await User.countDocuments({ role: 'STUDENT' });
    const totalTeachers = await User.countDocuments({ role: 'TEACHER' });
    const totalMentors = await User.countDocuments({ role: 'MENTOR' });
    const totalCoordinators = await User.countDocuments({ role: 'COORDINATOR' });

    const total = totalStudents + totalTeachers + totalMentors + totalCoordinators;

    return {
        totalStudents,
        totalTeachers,
        totalMentors,
        totalCoordinators,
        total,
    };
};

//get recent create activity like class, event, resource, assignment etc.
const getRecentActivitiesFromDB = async () => {
    const recentEvents = await Event.find()
        .sort({ createdAt: -1 })
        .limit(2)
        .populate('title');
    
    const resources = await LearningMaterial.find()
        .sort({ createdAt: -1 })
        .limit(2)
        .populate('title');
    
    const getAssignments = await Assignment.find()
        .sort({ createdAt: -1 })
        .limit(2)
        .populate('title');

    return {
        recentEvents,
        resources,
        getAssignments
    };

};

export const AdminService = {
    createAdminToDB,
    deleteAdminFromDB,
    getAdminFromDB,
    getTotalUsersByRoleFromDB,
    getRecentActivitiesFromDB
};
