'use client';

import { getAllProducts } from "@/Api/Product/ProductList";
import { DollarSign, ShoppingBag, Tag } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Product {
    id: number
    sku: string
    name: string
    short_description: {
        String: string
    }
    long_description: {
        String: string
    }
    price: number
    special_price: {
        Float64: number
    }
    created_at: string
    updated_at: string
    base_image_url: {
        String: string
    }
}

export default function ProductList() {
    const [productList, setProductList] = useState<Product[]>([]);
    const productBaseImage = "/product-placeholder.png";

    useEffect(() => {
        async function getProducts() {
            try {
                const products = await getAllProducts();
                if (products.length) {
                    setProductList(products)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getProducts()
    }, [])
    return (
        <div className="min-h-screen bg-gradient-to-br from-black to-gray-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-100 mb-2">Our Products</h1>
          <p className="text-gray-100">Discover our curated collection of premium items</p>
        </div>

        {productList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-xl text-gray-500">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productList.map((p) => (
              <div
                key={p.id}
                className="bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-gray-50 transition-all duration-300 overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative h-64 bg-gray-100 overflow-hidden">
                  <img
                    src={p?.base_image_url?.String || productBaseImage}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {p?.special_price?.Float64 && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Sale
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-50 mb-2 line-clamp-2">
                    {p.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-4 h-4 text-gray-200" />
                    <span className="text-sm text-gray-500">SKU: {p.sku}</span>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {p.short_description?.String}
                  </p>

                  {p.long_description?.String && (
                    <p className="text-gray-300 text-xs mb-4 line-clamp-3">
                      {p.long_description.String}
                    </p>
                  )}

                  {/* Pricing */}
                  <div className="flex items-end gap-3 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-5 h-5 text-gray-700" />
                      {p?.special_price?.Float64 ? (
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-red-600">
                            {p.special_price.Float64.toFixed(2)}
                          </span>
                          <span className="text-lg text-gray-400 line-through">
                            {p.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-2xl font-bold text-gray-50">
                          {p.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    )
}