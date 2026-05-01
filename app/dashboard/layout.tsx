import Link from "next/link";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-black text-white p-6">
                <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>

                <nav className="space-y-3">
                    <Link
                        href="/dashboard"
                        className="block hover:bg-gray-800 px-4 py-2 rounded"
                    >
                        Dashboard
                    </Link>

                    <Link
                        href="/dashboard/products"
                        className="block hover:bg-gray-800 px-4 py-2 rounded"
                    >
                        Products
                    </Link>

                    <Link
                        href="/dashboard/products/new"
                        className="block hover:bg-gray-800 px-4 py-2 rounded"
                    >
                        Add Product
                    </Link>
                </nav>
            </aside>

            {/* Main */}
            <main className="flex-1 p-8">{children}</main>
        </div>
    );
}