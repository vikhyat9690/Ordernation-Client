'use client';

import { ShoppingBag, Package, Users, Settings, BarChart3, Menu, X } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
// import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getLocalStorage } from '../components/Helper';
// import { Router } from 'next/router';

export default function AdminLayout({ children }: any) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if(pathname.includes('/admin_e34ta') && !getLocalStorage('access-token')) {
      router.replace('/admin_7s2u1/login');
    }
  }, [])

  const menuItems = [
    { icon: Package, label: 'Products', href: '/admin_e34ta/products' },
    { icon: Users, label: 'Customers', href: '/admin_e34ta/customers' },
    { icon: ShoppingBag, label: 'Orders', href: '/admin_e34ta/orders' },
    { icon: BarChart3, label: 'Analytics', href: '/admin_e34ta/analytics' },
    { icon: Settings, label: 'Settings', href: '/admin_e34ta/settings' },
  ];

  const modeSwitchHandler = () => {
    router.replace('/')
  }

  const homePageRouter = () => {
    router.replace('/admin_e34ta');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg shadow-lg"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-2xl z-40
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          w-1/4
        `}
      >
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 cursor-pointer" onClick={homePageRouter} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Admin Panel</h2>
              <p className="text-xs text-gray-400">Management Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 group"
                >
                  <item.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="font-medium">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-sm font-semibold">
              CV
            </div>
            <div>
              <p className="text-sm font-medium cursor-pointer" onClick={modeSwitchHandler}>Customer View</p>
              <p className="text-xs text-gray-400 cursor-pointer">Admin Mode</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN DASHBOARD CONTENT */}
      {/* MAIN RENDER OUTLET */}
      <main className="lg:ml-64 p-8 min-h-screen">
        {children}
      </main>

    </div>
  );
}