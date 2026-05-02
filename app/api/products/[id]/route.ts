import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validation";
import slugify from "slugify";
import { z } from "zod";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const product = await prisma.product.findUnique({
        where: { id: Number(id) },
    });
    return NextResponse.json(product);

}
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();

        const validation = productSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.issues[0]?.message || "Validation failed" },
                { status: 400 }
            );
        }

        const product = await prisma.product.update({
            where: {
                id: Number(id),
            },
            data: {
                ...validation.data,
                slug: slugify(validation.data.title, { lower: true }),
            },
        });

        return NextResponse.json(product);
    } catch (error: any) {
        console.error("UPDATE PRODUCT ERROR:", error);
        return NextResponse.json(
            { error: error.message || "Update failed" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    await prisma.product.delete({
        where: {
            id: Number(id),
        },
    });

    return NextResponse.json({
        message: "Deleted successfully",
    });
}
