import MessageModel from "@/models/Messages";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextResponse, type NextRequest } from "next/server";
export async function POST(req: NextRequest) {
    const { _id } = await req.json();
    try {
        const cookie = cookies();
        const token = cookie.get('myToken')?.value as string;
        const secret = process.env.JWT_SECRET as string;
        const Token = jwt.verify(token, secret);
        const UserId = (Token as JwtPayload).id;
        console.log(UserId);
        const selectedUserToChat = _id;

        const getAllMessages = await MessageModel.find({
            sender: { $in: [UserId, selectedUserToChat] },
            recipient: { $in: [UserId, selectedUserToChat] }
        }).sort({ createdAt: 1 })

        console.log(getAllMessages);
        return NextResponse.json({ status: true, msg: "Success get msg", getAllMessages }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: false, msg: "Failed To get messages" }, { status: 401 })
    }
}