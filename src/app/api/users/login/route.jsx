import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import connect from "@/database/db"
connect();
export async function POST(req= NextRequest,) {
    try {
        const { email, password } = await req.json();
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({message:"Invalid email or password"},{status:400})
        }
        const PasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!PasswordCorrect) {
            return NextResponse.json({message:"Invalid email or password"},{status:400})
        }
        const tokenData = {
            id: user._id,
            email: user.email,
            username:user.username,
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_TOKEN, { expiresIn: '1d' })
        const res = NextResponse.json(
            {
                message: `Welcome back ${user.username}`,
                success: true
            },
            { status: 200 }
        );

        res.cookies.set("token", token, {httpOnly:true});

        return res;
    } catch (err) {
        return NextResponse.json({message:err.message},{status:401})
    }
}