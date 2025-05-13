import { StreamChat } from "stream-chat";
import "dotenv/config"

const apiKey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_API_SECRET

const streamClient = StreamChat.getInstance(apiKey,apiSecret);

export const upsertStreamUser = async (userData) =>{
    try {
        await streamClient.upsertUsers([userData])
        return userData
    } catch (error) {
        console.log("Error upserting stream user" ,error);
    }
}

export const generateStreamToken = async (userId) =>{
    try {
        //user id must be in string
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);
    } catch (error) {
        console.error("Error in generating the stream token ", error);
    }
}