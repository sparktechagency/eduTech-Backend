import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { MessageService } from './message.service';

const sendMessage = catchAsync(async (req: Request, res: Response) => {;

    const message = await MessageService.sendMessageToDB(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Send Message Successfully',
        data: message,
    });

});

const getMessage = catchAsync(async (req: Request, res: Response) => {

    const id = req.params.id;
    const messages = await MessageService.getMessageFromDB(req.user, id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Message Retrieve Successfully',
        data: messages,
    });

});

const updateMessage = catchAsync(async (req: Request, res: Response) => {

    const id = req.params.id;
    const message = await MessageService.updateMessageFromDB(id, req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Message Updated Successfully',
        data: message,
    });

});

const deleteMessage = catchAsync(async (req: Request, res: Response) => {

    const id = req.params.id;
    await MessageService.deleteMessageFromDB(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Message Deleted Successfully',
    });

});

export const MessageController = { 
    sendMessage, 
    getMessage, 
    updateMessage, 
    deleteMessage   
};