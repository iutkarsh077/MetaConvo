import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import DBConnect from "@/Database";
import { cookies } from 'next/headers';
import ChatApp from "@/models/Signup";


export async function GET(){
    DBConnect();
    try {
    const cookie = cookies();
    const token = cookie.get('myToken')?.value as string;
    const secret = process.env.JWT_SECRET!;
    const Token = jwt.verify(token, secret);
    const UserId = (Token as JwtPayload).id;
    console.log(UserId);
    const UserDetails = await ChatApp.findById({_id: UserId});
    return NextResponse.json({ status: true, UserDetails }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ status: false, msg: "Failed To get UserDetails" }, { status: 401 })    
    }
}