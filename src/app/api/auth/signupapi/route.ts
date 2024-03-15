import bcryptjs from 'bcryptjs';
import DBConnect from "@/Database";
import ChatApp from "@/models/Signup";
import { NextResponse, type NextRequest } from "next/server";
export async function POST(req: NextRequest) {
    try {
        DBConnect();
        const { name, email, password } = await req.json();
        
        const findingUser = await ChatApp.findOne({ email: email }, { password: 0 });
        // console.log(findingUser);
        if (findingUser) {
            return NextResponse.json({ success: false, msg: "User Already exist" }, { status: 302 })
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const CreateUser = await ChatApp.create({name: name, email: email, password: hashedPassword});

        return NextResponse.json({ success: true, msg: "User Signup Successfully" }, { status: 201 });
    } catch (error) {
        // console.log(error);
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 })
    }
}