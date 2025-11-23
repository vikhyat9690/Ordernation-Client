'use client';
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Define an interface or type for better type safety
interface ProductFormProps {
    initialValues?: any; // Consider replacing 'any' with a Product interface
    onSubmit: (formData: any) => void;
}

export default function ProductForm({ initialValues = {}, onSubmit }: ProductFormProps) {
  // Use a more predictable initial state structure
  const [form, setForm] = useState(() => ({
    name: '',
    sku: '',
    price: '',
    special_price: '',
    short_description: '',
    long_description: '',
    base_image_url: '',
    ...initialValues,
  }));
  
  // You declared productData but weren't using it. Removed it for cleanliness,
  // or you should manage your product data fetching state here if needed.
  // const [productData, setProductData] = useState([]); 

  const param = useParams();
  const router = useRouter();
  
  // Extract base path for reliable back navigation
  const basePath = `/admin_e34ta/products`; 
  
  // Log product ID for reference, but pId isn't needed for form logic itself
  // const pId = param?.id;

  // Sync internal state with initialValues when they change (e.g., fetching product data for edit)
  useEffect(() => {
    if (initialValues) {
      setForm((prevForm: any) => ({ ...prevForm, ...initialValues }));
    }
  }, [initialValues]);

  console.log(form)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Note: TypeScript users should use React.ChangeEvent<HTMLInputElement> or a combined type.
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // <-- Crucial: Prevents full page reload
    onSubmit(form);     // <-- Calls the external submit handler with the form data
  };

  // FIX: Use router.push() for reliable navigation back to the product list
  const handleBack = () => {
    router.push(basePath);
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white shadow-xl rounded-lg max-w-4xl mx-auto space-y-6 border border-gray-100">
      <div className="text-2xl font-bold text-gray-800 border-b pb-4 mb-4">
        Product Details 📦
      </div>

      {/* Input Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Name Input */}
        <div className="col-span-1">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            id="name"
            name="name"
            value={form.name} // No need for || "" if initial state is structured
            onChange={handleChange}
            placeholder="Name of the product"
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
        </div>

        {/* SKU Input */}
        <div className="col-span-1">
          <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">SKU (Stock Keeping Unit)</label>
          <input
            id="sku"
            name="sku"
            value={form.sku}
            onChange={handleChange}
            placeholder="e.g., ABC-12345"
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
        </div>

        {/* Price Input */}
        <div className="col-span-1">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
          <input
            id="price"
            name="price"
            value={form.price ?? 0.00}
            onChange={handleChange}
            placeholder="e.g., 99.99"
            type="number"
            step="0.01"
            min="0"
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
        </div>

        {/* Special Price Input */}
        <div className="col-span-1">
          <label htmlFor="special_price" className="block text-sm font-medium text-gray-700 mb-1">Special Price ($)</label>
          <input
            id="special_price"
            name="special_price"
            value={form.special_price?.Float64 ?? 0.00}
            onChange={handleChange}
            placeholder="Discounted price"
            type="number"
            step="0.01"
            min="0"
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
        </div>
      </div>

      {/* Description Fields */}
      <div className="space-y-6">
        {/* Short Description */}
        <div>
          <label htmlFor="short_description" className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
          <textarea
            id="short_description"
            name="short_description"
            value={form.short_description?.String ?? ''}
            onChange={handleChange}
            placeholder="A brief summary for product listings (max 255 chars)"
            rows={2} // Added rows attribute for better usability
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 resize-none transition duration-150 ease-in-out"
          ></textarea>
        </div>

        {/* Long Description */}
        <div>
          <label htmlFor="long_description" className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
          <textarea
            id="long_description"
            name="long_description"
            value={form.long_description?.String ?? ''}
            onChange={handleChange}
            placeholder="Detailed description for the product page"
            rows={5} // Added rows attribute for better usability
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 resize-none transition duration-150 ease-in-out"
          ></textarea>
        </div>
      </div>

      {/* Image URL */}
      <div>
        <label htmlFor="base_image_url" className="block text-sm font-medium text-gray-700 mb-1">Base Image URL</label>
        <input
          id="base_image_url"
          name="base_image_url"
          value={form.base_image_url?.String ?? ''}
          onChange={handleChange}
          placeholder="https://example.com/product-image.jpg"
          className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
        />
      </div>

      {/* Action Buttons */}
      <div className="pt-4 flex justify-end gap-3">
         <button
          // Removed type="submit" so this button doesn't trigger form submission
          type="button" 
          className="px-6 py-2 flex items-center gap-2 cursor-pointer bg-gray-500 text-white font-semibold rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          onClick={handleBack} // <-- Correctly calls handleBack
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>
        <button
          type="submit" // <-- Correct: This button triggers the form's onSubmit
          className="px-6 py-2 bg-indigo-600 cursor-pointer text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          Save Product
        </button>
      </div>
    </form>
  );
}