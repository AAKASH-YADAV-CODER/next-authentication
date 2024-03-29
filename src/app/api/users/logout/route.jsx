import { NextResponse } from "next/server";
export async function GET(){
    try {
        const res = NextResponse.json({ message: "Successfully Logout", success: true }, { status: 200 })
        res.cookies.set('token', '', { httpOnly: true, expires: new Date(0) });
        return res;
    } catch (err) {
        return NextResponse.json({message:err.message},{status:500})
    }
}