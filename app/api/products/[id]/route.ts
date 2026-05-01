import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validation";
import slugify from "slugify";

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

        const validated = productSchema.parse(body);

        const product = await prisma.product.update({
            where: {
                id: Number(id),
            },
            data: {
                ...validated,
                slug: slugify(validated.title, { lower: true }),
            },
        });

        return NextResponse.json(product);
    } catch {
        return NextResponse.json(
            { error: "Update failed" },
            { status: 400 }
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
