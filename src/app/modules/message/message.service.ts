import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../../shared/apiFeature';
import { IMessage } from './message.interface';
import { Message } from './message.model';
import { Chat } from '../chat/chat.model';
import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';
import { redis } from '../../../shared/redisClient';

const sendMessageToDB = async (payload: any) => {
  const response = await Message.create(payload);
  // Cache invalidate: delete all pages for this chat + all users
  const chatId = payload.chatId;
  const keys = await redis.keys(`chat:${chatId}:user:*`);
  if (keys.length > 0) {
    await redis.del(keys);
    console.log(`[Cache] Invalidated ${keys.length} keys for chat ${chatId}`);
  }
  return response;
};

const getMessageFromDB = async (user: JwtPayload, id: string, query: Record<string, any>) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid Chat ID');
  }

  const cacheKey = `chat:${id}:user:${user.id}:page:${query.page || 1}:limit:${query.limit || 20}`;
  
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log('[Redis Cache] HIT:', cacheKey);
      const parsed = JSON.parse(cached) as { messages: IMessage[], pagination: any, participant: any };
      return parsed;
    }
  } catch (redisError) {
    console.error('[Redis Cache] MISS/ERROR:', redisError);
  }

  
  const result = new QueryBuilder(
    Message.find({ chatId: id }).sort({ createdAt: -1 }),  
    query
  ).paginate();  
  
  const messages = await result.queryModel; 
  
  const participant = await Chat.findById(id).populate({
    path: 'participants',
    select: 'name profile location',
    match: { _id: { $ne: user.id } }
  });

  const response = { 
    messages, 
    participant: participant?.participants[0] 
  };

  try {
    await redis.set(cacheKey, JSON.stringify(response), { EX: 300 });
    console.log('[Redis Cache] SET:', cacheKey);
  } catch (cacheError) {
    console.error('[Redis Cache Set] ERROR:', cacheError);
  }

  return response;
};

export const MessageService = { sendMessageToDB, getMessageFromDB };