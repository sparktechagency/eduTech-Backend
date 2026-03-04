import { Types } from "mongoose";
import QueryBuilder, { GetAllEventsQuery } from "../../../../shared/apiFeature";
import { IUser } from "../../user/user.interface";
import { IEvent } from "./event.interface";
import { Event } from "./event.model";
interface IUserFilter {
  _id: string;
  role: string;
}
const createEventFromDB = async (payload: Partial<IEvent>) => {
  const event = await Event.create(payload);
  return event;
};

// const getAllEventsFromDB = async (studentId: string | undefined, query?: GetAllEventsQuery) => {
//   const safeQuery = query || {};

//   const page = Number(safeQuery.page) || 1;
//   const limit = Number(safeQuery.limit) || 10;
//   const skip = (page - 1) * limit;


//   let filter: any = {
//     $or: [
//       { studentAssigned: { $size: 0 } },
//       { studentAssigned: { $exists: false } } 
//     ]
//   };

//   if (studentId) {
//     const sId = new Types.ObjectId(studentId);
//     filter.$or.push({ studentAssigned: sId });
//   }


//   let finalQuery = filter;
//   if (safeQuery.searchTerm) {
//     finalQuery = {
//       $and: [
//         filter,
//         {
//           $or: [
//             { title: { $regex: safeQuery.searchTerm, $options: "i" } },
//             { description: { $regex: safeQuery.searchTerm, $options: "i" } },
//           ],
//         },
//       ],
//     };
//   }


//   const queryBuilder = Event.find(finalQuery);
//   const total = await Event.countDocuments(finalQuery);

//   const events = await queryBuilder
//     .sort(safeQuery.sort || "-createdAt")
//     .skip(skip)
//     .limit(limit)
//     .populate("targetTrack")
//     .populate("targetGroup")
//     .populate("studentAssigned")
//     .exec();

//   return {
//     success: true,
//     data: events || [],
//     pagination: {
//       total,
//       totalPage: Math.ceil(total / limit),
//       page,
//       limit,
//     },
//   };
// };



const getAllEventsFromDB = async (
  studentId: string | undefined, 
  role: string | undefined, 
  query?: any
) => {
  const safeQuery = query || {};
  const page = Number(safeQuery.page) || 1;
  const limit = Number(safeQuery.limit) || 10;
  const skip = (page - 1) * limit;

  let finalFilter: any = {};

  // ১. যদি SUPER_ADMIN না হয়, তবেই ফিল্টার অ্যাপ্লাই হবে
  if (role !== 'SUPER_ADMIN') {
    finalFilter = {
      $or: [
        { studentAssigned: { $size: 0 } },      // পাবলিক ইভেন্ট (খালি অ্যারে)
        { studentAssigned: { $exists: false } } // ফিল্ড নেই এমন ইভেন্ট
      ]
    };

    // যদি স্টুডেন্ট আইডি থাকে, তবে তার জন্য নির্দিষ্ট ইভেন্টও যোগ হবে
    if (studentId) {
      finalFilter.$or.push({ studentAssigned: new Types.ObjectId(studentId) });
    }
  } 
  // role === 'SUPER_ADMIN' হলে finalFilter = {} থাকবে, যার মানে সব ডাটা আসবে।

  // ২. সার্চ টার্ম হ্যান্ডলিং
  if (safeQuery.searchTerm) {
    const searchCondition = {
      $or: [
        { title: { $regex: safeQuery.searchTerm, $options: "i" } },
        { description: { $regex: safeQuery.searchTerm, $options: "i" } },
      ],
    };

    // যদি আগে থেকেই ফিল্টার থাকে (Non-Admin), তবে $and করবে, নাহলে শুধু সার্চ
    if (Object.keys(finalFilter).length > 0) {
      finalFilter = { $and: [finalFilter, searchCondition] };
    } else {
      finalFilter = searchCondition;
    }
  }

  const total = await Event.countDocuments(finalFilter);
  const events = await Event.find(finalFilter)
    .sort(safeQuery.sort || "-createdAt")
    .skip(skip)
    .limit(limit)
    .populate("targetTrack")
    .populate("targetGroup")
    .populate("studentAssigned")
    .exec();

  return {
    success: true,
    data: events || [],
    pagination: {
      total,
      totalPage: Math.ceil(total / limit),
      page,
      limit,
    },
  };
};

//write g service for only studentAssigned id and this get user token to id match then get specific event others event not needs
const getEventsForStudentFromDB = async (studentId: string, query?: GetAllEventsQuery) => {
    const safeQuery = query || {};

    const page = Number(safeQuery.page) || 1;
    const limit = Number(safeQuery.limit) || 10;
    const skip = (page - 1) * limit;

    let queryBuilder = Event.find({ studentAssigned: studentId });

    if (safeQuery.searchTerm) {
        queryBuilder = queryBuilder.find({
            $or: [
                { title: { $regex: safeQuery.searchTerm, $options: "i" } },
                { description: { $regex: safeQuery.searchTerm, $options: "i" } },
            ],
        });
    }

    const total = await queryBuilder.clone().countDocuments();

    const events = await queryBuilder
        .sort(safeQuery.sort || "-createdAt")
        .skip(skip)
        .limit(limit)
        .populate("targetTrack")
        .populate("targetGroup")
        .populate("studentAssigned")
        .exec();

    return {
        success: true,
        data: events || [],
        pagination: {
            total,
            totalPage: Math.ceil(total / limit),
            page,
            limit,
        },
    };
};

const getEventByIdFromDB = async (id:string) => {
    const result = await Event.findById(id)
    .populate("targetTrack")
    .populate("targetGroup")
    .populate("studentAssigned")
    return result;
}

const updateEventByIdInDB = async (id:string, payload:Partial<IEvent>) => {
    const result = await Event.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    return result;
}



const deleteEventByIdFromDB = async (id:string) => {
    const result = await Event.findByIdAndDelete(id);
    return result;
}

export const EventService = {
    createEventFromDB,
    getAllEventsFromDB,
    getEventByIdFromDB,
    updateEventByIdInDB,
    deleteEventByIdFromDB,
    getEventsForStudentFromDB
};