import ChatApp from "@/models/Signup";
import { NextResponse, type NextRequest } from "next/server";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers'
import DBConnect from "@/Database";

export async function POST(req: NextRequest) {
    try {
        DBConnect();
        const { email, password } = await req.json();

        const findUser = await ChatApp.findOne({ email: email });

        if (!findUser) {
            return NextResponse.json({ success: false, msg: "Inavlid Email" }, { status: 401 })
        }

        const isMatch = await compare(password, findUser.password);
        if (!isMatch) {
            return NextResponse.json({ success: false, msg: "Invalid Password" }, { status: 401 })
        }

        const jwtSecret = process.env.JWT_SECRET as string;
        const token = jwt.sign({ id: findUser._id, email: findUser.email }, jwtSecret, { expiresIn: "1d" });

        const cookieStore = cookies()
        const theme = cookieStore.set('myToken', token, {
            path: '/',
            maxAge: 60 * 60 * 24,
            httpOnly: true,
            sameSite: 'lax',
        });
        return NextResponse.json({ success: true, msg: "Login Success", isLoggedIn: true, findUser }, { status: 200 })
    } catch (error) {
        // console.log(error);
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 })
    }
}