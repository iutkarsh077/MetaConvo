import DBConnect from "@/Database";
import MessageModel from "@/models/Messages";
import jwt, {JwtPayload} from 'jsonwebtoken';
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest){
         try {
            DBConnect();
        const {msg, selectedToChat, uniqueMessageId} = await req.json();
        console.log(msg, selectedToChat);
        const cookie = cookies();
        const token = cookie.get('myToken')?.value as string;
        const secret = process.env.JWT_SECRET as string;
        const Token = jwt.verify(token, secret);
        const UserId = (Token as JwtPayload).id;
        console.log(UserId);

        const savedMsg = await MessageModel.create({
            sender: UserId,
            recipient: selectedToChat,
            text: msg,
            UniqueMessageId: uniqueMessageId
        })

        

        return NextResponse.json({msg: "Data Is Saved", savedMsg}, {status: 201});
         } catch (error) {
            console.log(error);
            return NextResponse.json({msg: "Invalid Data"}, {status: 401})
         }
}