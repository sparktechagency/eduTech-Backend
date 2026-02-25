import xlsx from 'xlsx';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../../errors/ApiError';
import { User } from '../../user/user.model';
import { USER_ROLES } from '../../../../enums/user';
import { UserGroup } from '../../user-group/user-group.model';
import { IStudentReview } from '../students/management/students.interface';
import { StudentProfile } from '../students/management/students.model';
import QueryBuilder from '../../../../shared/apiFeature';
import { query } from 'express';

const bulkImportMentors = async (fileBuffer: Buffer) => {
    const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const mentorsData = xlsx.utils.sheet_to_json(sheet);

    if (!mentorsData.length) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Excel file is empty');
    }

    const createdUsers = [];
    const errors = [];

    for (const data of mentorsData as any[]) {
        try {
            const { 
                FirstName, LastName, Email, Phone, 
                Company, JobTitle, userGroup, Bio, 
                Password 
            } = data;

            if (!Email) continue;

            const existingUser = await User.findOne({ email: Email });
            if (existingUser) {
                errors.push(`Email ${Email} already exists.`);
                continue;
            }

            let userGroupIds: any[] = [];

            if (userGroup) {
                const groupNames = userGroup.toString().split(',').map((g: string) => g.trim());
                
                const foundGroups = await UserGroup.find({
                    name: { $in: groupNames }
                }).select('_id'); 

                if (foundGroups.length > 0) {
                    userGroupIds = foundGroups.map((group: { _id: any; }) => group._id);
                } else {
                    errors.push(`User group(s) not found: ${userGroup}`);
                }
            }

            const userData = {
                name: `${FirstName} ${LastName}`,
                email: Email,
                mobileNumber: Phone?.toString(),
                role: USER_ROLES.MENTOR,
                password: Password ? String(Password) : '11111111',
                professionalTitle: JobTitle,
                company: Company,
                
                userGroup: userGroupIds,
                
                about: Bio || "",
                accountInformation: { status: false },
                isSubscribed: false,
                isUpdate: false,
                verified: true,
                discount: 0
            };

            const newUser = await User.create(userData);
            createdUsers.push(newUser);

        } catch (err: any) {
            errors.push(`Error for ${data?.Email}: ${err.message}`);
        }
    }

    return {
        importedCount: createdUsers.length,
        errorCount: errors.length,
        errors: errors,
        message: 'Bulk import process completed'
    };
};

const getAllMentorsFromDB = async (query: any) => {
  const qb = new QueryBuilder(User.find({ role: USER_ROLES.MENTOR }), query)
    .search(['firstName', 'lastName', 'email'])
    .filter()
    .sort()
    .paginate();

  const mentors = await qb.queryModel
    .populate('userGroup')
    .populate('assignedStudents', 'name email profile contact location');

  const pagination = await qb.getPaginationInfo();

  return { mentors, pagination };
};

// const getAllStudentReportsFromDB = async (query: Record<string, any>) => {
//     const result = new QueryBuilder(WeeklyReport.find(), query)
//     .search(['studentId', 'weekStartDate', 'weekEndDate', 'isPresent', 'achievedHardOutcomes', 'softSkillImprovements', 'comments', 'goalSheet', 'objectives'])
//     .filter()
//     .sort()
//     .paginate();
//     const reports = await result.queryModel
//     .populate('studentId') 
//         .sort({ weekStartDate: -1 }); 

//     return { reports, pagination: await result.getPaginationInfo() };
// };


const getMentorById = async (id: string) => {
    const mentor = await User.findById(id)
    .populate('userGroup')
    .populate('assignedStudents', 'name email profile contact location');
    if (!mentor || mentor.role !== USER_ROLES.MENTOR) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Mentor not found');
    }
    return mentor;
};

const updateMentor = async (id: string, updateData: Partial<any>) => {
    const mentor = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!mentor || mentor.role !== USER_ROLES.MENTOR) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Mentor not found');
    }
    return mentor;
};

const addReviewToStudent = async (userId: string, reviewData: IStudentReview) => {
  const result = await User.findByIdAndUpdate(
    userId,
    {
      $push: { reviews: reviewData }, 
    },
    { new: true, runValidators: true }
  );
  return result;
};

const deleteMentor = async (id: string) => {
    const mentor = await User.findByIdAndDelete(id);
    if (!mentor || mentor.role !== USER_ROLES.MENTOR) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Mentor not found');
    }
    return mentor;
}

export const UserService = {
    bulkImportMentors,
    getAllMentorsFromDB,
    getMentorById,
    updateMentor,
    deleteMentor
};