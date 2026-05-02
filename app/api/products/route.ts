import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validation";
import slugify from "slugify";
import { z } from "zod";

export async function GET() {
    const products = await prisma.product.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return NextResponse.json(products);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const validation = productSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.issues[0]?.message || "Validation failed" },
                { status: 400 }
            );
        }

        const product = await prisma.product.create({
            data: {
                ...validation.data,
                slug: slugify(validation.data.title, { lower: true }),
            },
        });

        return NextResponse.json(product);
    } catch (error: any) {
        console.error("CREATE PRODUCT ERROR:", error);
        return NextResponse.json(
            { error: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
}