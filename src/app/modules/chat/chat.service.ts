import { IMessage } from '../message/message.interface';
import { Message } from '../message/message.model';
import { IChat } from './chat.interface';
import { Chat } from './chat.model';

const createChatToDB = async (payload: string[]): Promise<IChat> => {
    const isExistChat = await Chat.findOne({
        participants: { $all: payload }
    });

    if (isExistChat) {
        return isExistChat;
    }

    const result = await Chat.create({
        participants: payload,
        status: true
    });

    return result;
};

const getChatFromDB = async (user: any, search: string): Promise<IChat[]> => {
  
    const chats: any = await Chat.find({ participants: { $in: [user.id] } })
        .populate({
            path: 'participants',
            select: '_id firstName lastName image',
            match: {
            _id: { $ne: user.id }, 
            ...(search && { name: { $regex: search, $options: 'i' } }),
            }
        })
        .select('participants status');
  
    const filteredChats = chats?.filter(
        (chat: any) => chat?.participants?.length > 0
    );
  
    const chatList: IChat[] = await Promise.all(
        filteredChats?.map(async (chat: any) => {
            const data = chat?.toObject();
    
            const lastMessage: IMessage | null = await Message.findOne({ chatId: chat?._id })
            .sort({ createdAt: -1 })
            .select('text offer createdAt sender');
    
            return {
                ...data,
                lastMessage: lastMessage || null,
            };
        })
    );
    
    return chatList;
};

export const ChatService = { createChatToDB, getChatFromDB };