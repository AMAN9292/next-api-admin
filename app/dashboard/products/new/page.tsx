"use client";

import { useState } from "react";
import axios from "axios";


export default function NewProductPage() {
    const [form, setForm] = useState({
        title: "",
        category: "",
        price: "",
        stock: "",
        description: "",
        thumbnail: "",
    });

    const [Loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

            await axios.post("/api/products", {
                ...form,
                price: Number(form.price),
                stock: Number(form.stock),
            });

            alert("Product Added");

            setForm({
                title: "",
                category: "",
                price: "",
                stock: "",
                description: "",
                thumbnail: "",
            });
        } catch (error: any) {
            setError(error.response?.data?.error || "Error adding product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
            <h1 className="text-2xl font-bold mb-6">Add Product</h1>

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
                    placeholder="Description"
                    rows={5}
                    className="w-full border p-3 rounded"
                />

                <button
                    disabled={Loading}
                    className="bg-black text-white px-6 py-3 rounded"
                >
                    {Loading ? "Adding..." : "Add Product"}
                </button>
            </form>
        </div>
    );
}
