import mongoose from "mongoose";
import { IReview } from "./review.interface";
import { Review } from "./review.model";
import { StatusCodes } from "http-status-codes";
import { User } from "../user/user.model";
import ApiError from "../../../errors/ApiError";

const createReviewToDB = async(payload:IReview): Promise<IReview>=>{


    // Fetch mentor and check if it exists in one query
    const user:any = await User.findById(payload.MENTOR).select('rating ratingCount');
    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, "No User Found");
    }

    if (payload.rating) {

        const rating = Number(payload.rating);
        if (rating < 1 || rating > 5) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid rating value");
        }

        const ratingCount = user.ratingCount + 1;

        let newRating;
        if (user.rating === null || user.rating === 0) {
            newRating = rating;
        } else {
            newRating = ((user.rating * user.ratingCount) + rating) / ratingCount;
        }

        await User.findByIdAndUpdate(
            {_id: payload.MENTOR}, 
            {rating: parseFloat(newRating.toFixed(2)) , ratingCount: ratingCount  }, 
            {new: true}
        )
    }

    const result = await Review.create(payload);
    if(!result){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed To create Review")
    }
    return payload;
};

const getReviewFromDB = async (userId: string): Promise<IReview[]> => {
    const reviews = await Review.find({ MENTOR: new mongoose.Types.ObjectId(userId) });
    return reviews;
};


export const ReviewService ={ 
    createReviewToDB,
    getReviewFromDB
};