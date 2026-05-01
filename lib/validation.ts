import { z } from "zod";

export const productSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    category: z.string().min(2, "Category must be at least 2 characters"),
    price: z.coerce.number().positive("Price must be positive"),
    stock: z.coerce.number().int().nonnegative("Stock cannot be negative"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    thumbnail: z.string().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;