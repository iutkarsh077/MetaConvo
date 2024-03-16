import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function DELETE(){
   try {
    const cookie = cookies();
    const tokenDelete =  cookie.delete("myToken");
    return NextResponse.json({status: true, msg: "Log out Success"}, {status: 200});

   } catch (error) {
    return NextResponse.json({status: false, msg: "Log out failed"}, {status: 400});
   }
}