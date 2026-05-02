
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const totalProducts = await prisma.product.count();
    const activeProducts = await prisma.product.count({
        where: { status: true }
    });
    const inactiveProducts = totalProducts - activeProducts;

    return (
        <div>

            <h1 className="text-3xl font-bold mb-8">
                Dashboard
            </h1>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-gray-500">Total Products</p>
                    <h2 className="text-4xl font-bold mt-2">
                        {totalProducts}
                    </h2>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-gray-500">Active</p>
                    <h2 className="text-4xl font-bold mt-2 text-green-600">
                        {activeProducts}
                    </h2>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-gray-500">Inactive</p>
                    <h2 className="text-4xl font-bold mt-2 text-red-600">
                        {inactiveProducts}
                    </h2>
                </div>
            </div>
        </div>
    );
}