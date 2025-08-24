import Chart from "@/components/ui/chart";
import { useGetAllOrdersQuery } from "@/lib/api";

function getLast7DaysLabels() {
  const labels = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    labels.push(d.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
  }
  return labels;
}

function getOrdersCountByDay(orders) {
  const counts = Array(7).fill(0);
  const today = new Date();
  orders.forEach(order => {
    const orderDate = new Date(order.createdAt);
    for (let i = 0; i < 7; i++) {
      const compareDate = new Date();
      compareDate.setDate(today.getDate() - (6 - i));
      if (
        orderDate.getDate() === compareDate.getDate() &&
        orderDate.getMonth() === compareDate.getMonth() &&
        orderDate.getFullYear() === compareDate.getFullYear()
      ) {
        counts[i]++;
      }
    }
  });
  return counts;
}

export default function Sales() {
  const {
      data: orders = [],
      isLoading,
      isError,
      error,
    } = useGetAllOrdersQuery();

  const labels = getLast7DaysLabels();
  const data = getOrdersCountByDay(orders);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Orders",
        data,
        backgroundColor: "#6366f1",
      },
    ],
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Orders in the Last 7 Days</h2>
      {isLoading ? (
        <div>Loading chart...</div>
      ) : (
        <Chart type="bar" data={chartData} options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: false },
          },
          scales: {
            y: { beginAtZero: true, ticks: { stepSize: 1 } },
          },
        }} />
      )}
    </div>
  );
}