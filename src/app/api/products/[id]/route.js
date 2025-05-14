import { NextResponse } from "next/server";
import { mysql } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    let { id } = await params;
    let results = await mysql.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    if (results.length === 0) {
      return NextResponse.json(
        {
          message: "Producto no encontrado ...",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(results);
  } catch (error) {
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

export async function PUT(request, { params }) {
  try {
    let data = await request.json();
    let { id } = await params;
    let results = await mysql.query("UPDATE products SET ? WHERE id = ?", [
      data,
      id,
    ]);
    if (results.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Producto no encontrado",
        },
        {
          status: 404,
        }
      );
    }
    let updatedProduct = await mysql.query(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );
    console.log(updatedProduct);
    return NextResponse.json(updatedProduct[0]);
  } catch (error) {
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

export async function DELETE(request, { params }) {
  try {
    let { id } = await params;
    let results = await mysql.query("DELETE FROM products WHERE id = ?", [
      id,
    ]);
    if (results.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Producto no encontrado ... ",
        },
        {
          status: 404,
        }
      );
    }
    return new Response(null, {
      status: 204,
    });
  } catch (error) {
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
