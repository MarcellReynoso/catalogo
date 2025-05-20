import { NextResponse } from "next/server";
import { mysql } from "@/libs/mysql";
import { writeFile } from "fs/promises";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dn8s1wqrl",
  api_key: "735776799881699",
  api_secret: process.env.CLOUDINARY_SECRET,
});

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
    const data = await request.formData();
    const image = data.get("image");
    if (!image) {
      return NextResponse.json(
        {
          message: "La imagen es requerida",
        },
        {
          status: 400,
        }
      );
    }

    // Guardar la imagen en public
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filepath = path.join(process.cwd(), "public", image.name);
    await writeFile(filepath, buffer);

    // Subir la imagen a Cloudinary
    const uploadResult = await cloudinary.uploader.upload(filepath);
    console.log(uploadResult);

    // Guardar el producto en la base de datos
    let results = await mysql.query("INSERT INTO products SET ?", {
      name: data.get("name"),
      description: data.get("description"),
      price: data.get("price"),
      image: uploadResult.secure_url,
    });

    return NextResponse.json({
      id: results.insertId,
      name: data.get("name"),
      description: data.get("description"),
      price: data.get("price"),
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
