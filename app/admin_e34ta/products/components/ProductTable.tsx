'use client';
import { BarChart3, Menu, Package, Settings, ShoppingBag, Users, X } from "lucide-react";
import { Edit2, Trash2, Eye, EyeOff, DollarSign } from 'lucide-react';
import Link from "next/link";
import { useState } from "react";

export default function ProductTable({ products }: { products: any[] }) {
   
  const handleDelete = (id: number) => {
    // TODO: Call delete API
    console.log('Delete product:', id);
  };

  const handleToggleStatus = (id: number, currentStatus: boolean) => {
    // TODO: Call disable/enable API
    console.log('Toggle status:', id, currentStatus);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">SKU</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Special Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  #{p.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium max-w-xs">
                  {p.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {p.sku}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-900 font-semibold">
                    <DollarSign className="w-4 h-4" />
                    {p.price.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  {p.special_price?.Float64 ? (
                    <div className="flex items-center gap-1">
                      <span className="text-red-600 font-semibold">
                        ${p.special_price.Float64.toFixed(2)}
                      </span>
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                        Sale
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs">N/A</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`
                      px-3 py-1 rounded-full text-xs font-semibold
                      ${p.disabled
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-green-100 text-green-700'
                      }
                    `}
                  >
                    {p.disabled ? 'Disabled' : 'Active'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <a
                      href={`/admin_e34ta/products/edit-product/${p.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150 group"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleToggleStatus(p.id, p.disabled)}
                      className={`
                        p-2 rounded-lg transition-colors duration-150
                        ${p.disabled
                          ? 'text-green-600 hover:bg-green-50'
                          : 'text-orange-600 hover:bg-orange-50'
                        }
                      `}
                      title={p.disabled ? 'Enable' : 'Disable'}
                    >
                      {p.disabled ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {products.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-gray-500">No products found</p>
        </div>
      )}
    </div>
  );
}