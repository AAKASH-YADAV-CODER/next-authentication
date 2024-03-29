import {User} from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import connect from "@/database/db";
connect();
export async function POST(req= NextRequest,) {
    try {
        const { username, email, password } = await req.json();
        
        //validation
        if (!username || !email || !password) {
            return NextResponse.json({ message: "Please Provide valid Data" }, { status: 400 });
        }
        if (!email.includes('@')) {
            return NextResponse.json({ message: "Please Provide valid Email" }, { status: 400 });
        }
        // user already exist
        let users = await User.findOne({ email });
        if (users) {
            return NextResponse.json({ message: "Already Exist" }, { status: 400 });
        }

        //Bcrypt Password
        const rounds = await bcryptjs.genSalt(10);
        const encryptedPassword = await bcryptjs.hash(password, rounds)
        //Create data in mongo db
        users=await User.create({
            username,
            email,
            password:encryptedPassword
        })
        return NextResponse.json({ message: "Successfully Signup" }, { status: 201 });

    } catch (err) {
        return NextResponse.json({error:err.message},{status:500})
    }
}