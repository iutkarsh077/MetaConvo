import DBConnect from "@/Database";
import ChatApp from "@/models/Signup";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET() {
    try {
        DBConnect();
        const cookieStore = cookies();
        const token: string | undefined = cookieStore.get('myToken')?.value.toString();
        if (!token) {
            throw new Error('Token not found');
        }
        // console.log(token);


        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

        if (typeof decodedToken !== 'object' || decodedToken === null || !('id' in decodedToken)) {
            throw new Error('Invalid token payload');
        }

        const userId = (decodedToken as JwtPayload).id;
        const user = await ChatApp.findById({ _id: userId });
       

        const AllFriendDetails = await ChatApp.find({ email: { $in: user.friends } });

        const isLoggedIn = true;
        return NextResponse.json({AllFriendDetails, isLoggedIn})
    } catch (error) {
        return NextResponse.json({ status: false, msg: "Error Fetching Friends List" }, { status: 400 })
    }
}