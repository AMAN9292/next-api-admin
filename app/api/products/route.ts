import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validation";
import slugify from "slugify";

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

        const validated = productSchema.parse(body);

        const product = await prisma.product.create({
            data: {
                ...validated,
                slug: slugify(validated.title, { lower: true }),
            },
        });

        return NextResponse.json(product);
    } catch (error: any) {
        console.error("CREATE PRODUCT ERROR:", error);
        return NextResponse.json(
            { error: error.errors ? error.errors[0].message : "Something went wrong" },
            { status: 400 }
        );
    }
}