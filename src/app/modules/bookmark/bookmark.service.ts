import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiError";
import { IBookmark } from "./bookmark.interface";
import { Bookmark } from "./bookmark.model";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import getDistanceFromCoordinates from "../../../shared/getDistanceFromCoordinates";
import { Review } from "../review/review.model";

const toggleBookmark = async (payload: { customer: string, PROVIDER: string }): Promise<string> => {

    if (!mongoose.Types.ObjectId.isValid(payload.PROVIDER)) {
        throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "Invalid PROVIDER ID")
    }

    // Check if the bookmark already exists
    const existingBookmark = await Bookmark.findOne(payload);

    if (existingBookmark) {
        // If the bookmark exists, delete it
        await Bookmark.findByIdAndDelete(existingBookmark._id);
        return "Bookmark Remove successfully";
    } else {

        // If the bookmark doesn't exist, create it
        const result = await Bookmark.create(payload);
        if (!result) {
            throw new ApiError(StatusCodes.EXPECTATION_FAILED, "Failed to add bookmark");
        }
        return "Bookmark Added successfully";
    }
};


const getBookmark = async (user: JwtPayload, query: Record<string, any>): Promise<IBookmark[]> => {

    const { coordinates } = query;

    if (!coordinates) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Please Provide coordinates")
    }

    const PROVIDERs = await Bookmark.find({ customer: user?.id })
        .populate([
            {
                path: "PROVIDER",
                select: "name location discount profile"
            },
        ])
        .select("PROVIDER")
        .lean();

    const PROVIDERsWithDistance = await Promise.all(PROVIDERs.map(async (PROVIDER: any) => {
        const distance = await getDistanceFromCoordinates(PROVIDER?.PROVIDER?.location?.coordinates, JSON?.parse(coordinates));
        // const rating = await getRatingForPROVIDER(PROVIDER?.PROVIDER?._id);
        // const service = await getPROVIDERCategory(PROVIDER?.PROVIDER?._id);

        return {
            ...PROVIDER,
            // services: service || [],
            // rating: rating,
            distance: distance ? distance : {},
            isBookmarked: true
        };
    }));

    return PROVIDERsWithDistance;
}

export const BookmarkService = {
     toggleBookmark,
     getBookmark 
    
    }