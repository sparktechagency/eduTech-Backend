import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { ChatService } from "./chat.service";
import ApiError from "../../../errors/ApiError";

const createChat = catchAsync(async (req: Request, res: Response) => {
    const user = req.user; 
    
    const targetParticipantId = req.body.participants?.[0]; 

    if (!targetParticipantId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Participant ID is required");
    }

    const chatParticipants = [user?.id, targetParticipantId];

    const result = await ChatService.createChatToDB(chatParticipants);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Chat created successfully',
        data: result,
    });
});

const getChat = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const search = req.query.search as string;
    const chatList = await ChatService.getChatFromDB(user, search);
  
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Chat Retrieve Successfully',
        data: chatList
    });
});

export const ChatController = { 
    createChat, 
    getChat
};