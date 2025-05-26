export default function Home() {
  return (
    <div className="h-full w-full space-y-8 p-8">
      <div className="flex flex-row gap-5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-row space-x-8">
            <div className="bg-primary-foreground flex h-32 w-64 flex-col p-2">
              <span className="text-2xl font-semibold">2,345</span>
              <span>Total Orders</span>
            </div>
            <div className="bg-primary-foreground flex h-32 w-64 flex-col p-2">
              <span className="text-2xl font-semibold">10,3400 KS</span>
              <span>Total Sales</span>
            </div>
            <div className="bg-primary-foreground flex h-32 w-64 flex-col p-2">
              <span className="text-2xl font-semibold">5491</span>
              <span>Total Customers</span>
            </div>
          </div>
          <div className="bg-primary-foreground h-52 w-full p-2">
            <h2 className="text-2xl font-semibold">Sale Performance</h2>
          </div>
        </div>
        <div className="bg-primary-foreground flex h-full w-full flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold">Order Overview</h2>
          <ul>
            <li className="px-2 py-1">Pending</li>
            <li className="px-2 py-1">Approved</li>
            <li className="px-2 py-1">Shipping</li>
            <li className="px-2 py-1">Shipped</li>
            <li className="px-2 py-1">Fullfilled</li>
            <li className="px-2 py-1">Pending</li>
            <li className="px-2 py-1">Approved</li>
            <li className="px-2 py-1">Shipping</li>
            <li className="px-2 py-1">Shipped</li>
            <li className="px-2 py-1">Fullfilled</li>
          </ul>
        </div>
      </div>
      <div className="bg-primary-foreground h-56 w-full p-2">
        <h2 className="text-2xl font-semibold">Top Selling Products</h2>
      </div>
    </div>
  );
}
