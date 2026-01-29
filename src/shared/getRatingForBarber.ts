import { StatusCodes } from "http-status-codes";
import ApiError from "../errors/ApiError";
import { Review } from "../app/modules/review/review.model";

const getRatingForPROVIDER = async (id: string)=>{
    try {
        const rating = await Review.aggregate([
            {
                $match: { PROVIDER: id }
            },
            {
                $group: {
                    _id: null,
                    totalRatingCount: { $sum: 1 },
                    totalRating: { $sum: "$rating" }
                }
            },
            {
                $project: {
                    averageRating: { $divide: ["$totalRating", "$totalRatingCount"] }
                }
            }
        ]);

        return rating[0]?.averageRating || 0;
    } catch (error) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to get rating");
    }
}

export default getRatingForPROVIDER;