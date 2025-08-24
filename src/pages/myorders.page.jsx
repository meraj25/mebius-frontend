import { useGetAllOrdersQuery } from "@/lib/api";
import { useUser } from "@clerk/clerk-react";

function MyOrdersPage() {
  const { user } = useUser();
  const userId = user?.id;

  // Fetch orders for this user
  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useGetAllOrdersQuery({ userId });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message || "Something went wrong"}</div>;

  return (
    <div>
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              Order #{order._id} - {order.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyOrdersPage;
