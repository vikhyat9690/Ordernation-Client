'use client';
import { useState, useEffect } from 'react';
import ProductForm from "../../components/ProductForm";
import { useParams } from 'next/navigation';
import { getProductById } from '@/Api/Product/ProductById';

// Define a type for your product data (optional but recommended for TypeScript)
interface ProductData {
    id: number;
    name: string;
    sku: string;
    price: number;
    special_price: {
        Float64: string;
        Valid: boolean
    };
    short_description: {
        String: string;
        Valid: boolean
    };
    long_description: {
        String: string;
        Valid: boolean
    };
    base_image_url: {
        String: string;
        Valid: boolean
    }
    created_at: string;
    updated_at: string;
}

export default function EditProduct() {
    const params = useParams();
    const productId = params?.id;

    // State to hold the fetched initial values for the form
    const [initialValues, setInitialValues] = useState<ProductData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // 1. Fetch Existing Product Data
    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            try {
                const res = await getProductById(Number(productId))
                if (Object.values(res).length) {
                    setInitialValues(res);
                }
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
            setIsLoading(false);
            // setInitialValues();
        };

        if (productId) {
            fetchProduct();
        } else {
            // Handle case where productId is missing (e.g., redirect or show error)
            setIsLoading(false);
        }
    }, [productId]);


    // 2. Define the onSubmit handler
    const handleFormSubmit = async (formData: ProductData) => {
        console.log('Submitting updated product data:', formData);

        // --- API Submission Logic Here ---
        try {
            // Example: Make a PUT request to update the product
            // const response = await fetch(`/api/admin/products/${productId}`, {
            //     method: 'PUT',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData),
            // });

            // if (response.ok) {
            //     alert('Product updated successfully!');
            //     // You might redirect the user here: router.push('/admin_e34ta/products');
            // } else {
            //     alert('Failed to update product.');
            // }

            console.log('Update simulation successful.');

        } catch (error) {
            console.error('Submission error:', error);
            alert('An error occurred during submission.');
        }
    };

    // 3. Render the Component
    if (isLoading) {
        return <div className="text-center p-10">Loading product details...</div>;
    }

    if (!initialValues) {
        return <div className="text-center p-10 text-red-600">Product not found.</div>;
    }

    console.log(initialValues)
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Product #{productId}</h1>
            <ProductForm
                // Pass the fetched data to populate the form
                initialValues={initialValues}
                // Pass the function to handle the submission logic
                onSubmit={handleFormSubmit}
            />
        </div>
    );
}