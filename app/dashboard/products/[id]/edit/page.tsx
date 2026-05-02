"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {
    const params = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        title: "",
        category: "",
        price: "",
        stock: "",
        description: "",
        thumbnail: "",
    });

    useEffect(() => {
        async function fetchProduct() {
            const res = await axios.get(`/api/products/${params.id}`);
            setForm({
                title: res.data.title || "",
                category: res.data.category || "",
                price: String(res.data.price || ""),
                stock: String(res.data.stock || ""),
                description: res.data.description || "",
                thumbnail: res.data.thumbnail || "",
            });
        }

        fetchProduct();
    }, [params.id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            setLoading(true);

            await axios.put(`/api/products/${params.id}`, {
                ...form,
                price: Number(form.price),
                stock: Number(form.stock),
            });

            alert("Updated Successfully");
            router.push("/dashboard/products");
        } catch (error: any) {
            setError(error.response?.data?.error || "Update Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
            <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full border p-3 rounded"
                />

                <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Category"
                    className="w-full border p-3 rounded"
                />

                <input
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="w-full border p-3 rounded"
                />

                <input
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="Stock"
                    className="w-full border p-3 rounded"
                />

                <input
                    name="thumbnail"
                    value={form.thumbnail}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="w-full border p-3 rounded"
                />

                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Description"
                    className="w-full border p-3 rounded"
                />

                <button className="bg-black text-white px-6 py-3 rounded">
                    {loading ? "Updating..." : "Update Product"}
                </button>
            </form>
        </div>
    );
}