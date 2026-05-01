

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const product = await prisma.product.findUnique({
        where: {
            id: Number(id),
        },
    });

    if (!product) {
        return NextResponse.json(
            { error: "Product not found" },
            { status: 404 }
        );
    }

    const updated = await prisma.product.update({
        where: {
            id: Number(id),
        },
        data: {
            status: !product.status,
        },
    });

    return NextResponse.json(updated);
}