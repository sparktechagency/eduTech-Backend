import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../../shared/apiFeature';
import { IMessage } from './message.interface';
import { Message } from './message.model';
import { Chat } from '../chat/chat.model';
import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';
import { redis } from '../../../shared/redisClient';
import { Server } from 'socket.io';

const sendMessageToDB = async (payload: any) => {
  const response = await Message.create(payload);

  const populatedResponse = await response.populate('sender', 'firstName lastName email profile');

  const chatId = payload.chatId;
  const keys = await redis.keys(`chat:${chatId}:user:*`);
  if (keys.length > 0) {
    await redis.del(keys);
    console.log(`[Cache] Invalidated ${keys.length} keys for chat ${chatId}`);
  }

  const io = global.socketServer as Server;
  if (io) {
    io.emit(`getMessage::${chatId}`, populatedResponse);
  }

  return populatedResponse;
};

const getMessageFromDB = async (user: JwtPayload, id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid Chat ID');
  }

  const cacheKey = `chat:${id}:user:${user.id}:allMessages`;

  // Try Redis cache first
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log('[Redis Cache] HIT:', cacheKey);
      return JSON.parse(cached) as { messages: IMessage[], participant: any };
    }
  } catch (redisError) {
    console.error('[Redis Cache] MISS/ERROR:', redisError);
  }

  const messages = await Message.find({ chatId: id })
    .sort({ createdAt: -1 })
    .populate('sender', 'firstName lastName email profileImg');
  
  const participantDoc = await Chat.findById(id).populate({
    path: 'participants',
    select: 'firstName lastName email profile location',
    match: { _id: { $ne: user.id } }
  });

  const response = {
    messages,
    participant: participantDoc?.participants[0] || null
  };

  // Cache in Redis
  try {
    await redis.set(cacheKey, JSON.stringify(response), { EX: 300 });
    console.log('[Redis Cache] SET:', cacheKey);
  } catch (cacheError) {
    console.error('[Redis Cache Set] ERROR:', cacheError);
  }

  return response;
};
const updateMessageFromDB = async (id: string, payload: any) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid Message ID');
  }

  const result = await Message.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteMessageFromDB = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid Message ID');
  }

  const result = await Message.findByIdAndDelete(id);
  return result;
};

export const MessageService = { 
  sendMessageToDB, 
  getMessageFromDB, 
  updateMessageFromDB, 
  deleteMessageFromDB  
};