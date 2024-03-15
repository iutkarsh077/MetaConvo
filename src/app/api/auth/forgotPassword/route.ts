import DBConnect from "@/Database";
import ChatApp from "@/models/Signup";
import { NextResponse, type NextRequest } from "next/server";
import bcryptjs from "bcryptjs"
export async function POST(req: NextRequest){
    try {
        DBConnect();
        const { email, password } = await req.json();

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const findUser = await ChatApp.findOneAndUpdate({email: email}, {password: hashedPassword});

        return NextResponse.json({status: true, msg: "Password Updated Successfully"}, {status: 200})
    } catch (error) {
        return NextResponse.json({status: false, msg: "Internal Server Error"}, {status: 501})
    }
}