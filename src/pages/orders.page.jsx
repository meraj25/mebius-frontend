import { useGetAllOrdersQuery } from "@/lib/api";

const OrdersPage = () => {
  const {
      data: orders = [],
      isLoading,
      isError,
      error,
    } = useGetAllOrdersQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>{order.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;
