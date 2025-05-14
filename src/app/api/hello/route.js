import { NextResponse } from "next/server";
import {conn} from '@/libs/mysql'

export async function GET(){
    const result = await conn.query("SELECT * FROM actor;");
    return NextResponse.json(result);
}