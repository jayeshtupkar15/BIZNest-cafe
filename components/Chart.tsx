// Chart.tsx
interface ChartData {
  labels: string[];
  sales: number[];
  orders: number[];
}

export const LineChart = ({ data }: { data: ChartData }) => {
  return (
    <div className="bg-white rounded-xl p-4 border border-amber-100">
      <h3 className="text-lg font-bold text-gray-800">Sales Trend</h3>
      <div className="w-full h-48 flex items-end relative">
        {data.sales.map((value: number, index: number) => (
          <div
            key={index}
            className="flex-grow bg-amber-400 mx-2 transition-all duration-300 rounded-t-lg"
            style={{ height: `${value}%` }}
          ></div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        {data.labels.map((label: string, index: number) => (
          <span key={index}>{label}</span>
        ))}
      </div>
    </div>
  );
};

export const BarChart = ({ data }: { data: ChartData }) => {
  return (
    <div className="bg-white rounded-xl p-4 border border-amber-100">
      <h3 className="text-lg font-bold text-gray-800">Order Volume</h3>
      <div className="w-full h-48 flex items-end relative">
        {data.orders.map((value: number, index: number) => (
          <div
            key={index}
            className="flex-grow bg-orange-400 mx-2 transition-all duration-300 rounded-t-lg"
            style={{ height: `${value}%` }}
          ></div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        {data.labels.map((label: string, index: number) => (
          <span key={index}>{label}</span>
        ))}
      </div>
    </div>
  );
};