"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("/api/products");
            setProducts(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteProduct = async (id: number) => {
        if (confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`/api/products/${id}`);
                setProducts(products.filter(product => product.id !== id));
            } catch (error) {
                alert("Error deleting product");
            }
        }
    };

    if (loading) {
        return <div className="max-w-6xl mx-auto mt-10 px-4 text-center">Loading...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto mt-10 px-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Products</h1>

                <Link
                    href="/dashboard/products/new"
                    className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                    + Create Product
                </Link>
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-xl shadow overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-max">
                    <thead className="bg-gray-50 text-gray-700 uppercase text-sm font-semibold">
                        <tr>
                            <th className="p-4 border-b">Image</th>
                            <th className="p-4 border-b">Title</th>
                            <th className="p-4 border-b">Category</th>
                            <th className="p-4 border-b">Price</th>
                            <th className="p-4 border-b">Stock</th>
                            <th className="p-4 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-gray-500">
                                    No products found. Start by creating one!
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50/50 transition">
                                    <td className="p-4">
                                        <img
                                            src={product.thumbnail || "https://via.placeholder.com/150"}
                                            alt={product.title}
                                            className="w-16 h-16 object-cover rounded-lg shadow-sm border"
                                        />
                                    </td>
                                    <td className="p-4 font-medium text-gray-900">{product.title}</td>
                                    <td className="p-4 text-gray-600">{product.category}</td>
                                    <td className="p-4 font-semibold text-gray-800">₹ {product.price}</td>
                                    <td className="p-4 text-gray-600">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center align-middle">
                                        <div className="flex gap-2 justify-center">
                                            <Link
                                                href={`/dashboard/products/${product.id}/edit`}
                                                className="bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 px-4 py-1.5 rounded-md transition text-sm font-medium"
                                            >
                                                Edit
                                            </Link>
                                            <button onClick={async () => {
                                                try {
                                                    await axios.patch(`/api/products/${product.id}/status`);
                                                    fetchProducts();
                                                } catch (error) {
                                                    alert("Failed to update status");
                                                }
                                            }}
                                                className={`px-4 py-1.5 rounded-md transition text-sm font-medium text-white ${product.status ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700"}`}>
                                                {product.status ? "Active" : "Inactive"}
                                            </button>
                                            <button
                                                onClick={() => deleteProduct(product.id)}
                                                className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-4 py-1.5 rounded-md transition text-sm font-medium"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}