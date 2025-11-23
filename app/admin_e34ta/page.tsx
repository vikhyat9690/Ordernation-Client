export default function Page() {
  return (
    <div className="flex flex-col gap-8">

      {/* Title */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your system activity</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
          <p className="text-sm text-gray-500">Total Orders</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">1,248</h2>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
          <p className="text-sm text-gray-500">Customers</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">532</h2>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
          <p className="text-sm text-gray-500">Products</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">314</h2>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
          <p className="text-sm text-gray-500">Revenue</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">$12,480</h2>
        </div>

      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm text-gray-600">
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-500">
              <tr className="border-b">
                <td className="p-3">#1023</td>
                <td className="p-3">Ravi Sharma</td>
                <td className="p-3">₹2,499</td>
                <td className="p-3 text-green-600 font-medium">Completed</td>
              </tr>

              <tr className="border-b">
                <td className="p-3">#1022</td>
                <td className="p-3">Vikram Singh</td>
                <td className="p-3">₹899</td>
                <td className="p-3 text-yellow-600 font-medium">Pending</td>
              </tr>

              <tr className="border-b">
                <td className="p-3">#1021</td>
                <td className="p-3">Sneha Patel</td>
                <td className="p-3">₹1,299</td>
                <td className="p-3 text-red-600 font-medium">Cancelled</td>
              </tr>
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}
