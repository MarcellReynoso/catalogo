import { NextResponse } from "next/server";
import { mysql } from "@/libs/mysql";

export async function GET() {
  try {
    let results = await mysql.query("SELECT * FROM products;");
    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  try {
    const { name, description, price } = await request.json();
    console.log({ name, description, price });
    let results = await mysql.query("INSERT INTO products SET ?", {
      name,
      description,
      price,
    });
    console.log(results);
    return NextResponse.json({
      id: results.insertId,
      name,
      description,
      price,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
