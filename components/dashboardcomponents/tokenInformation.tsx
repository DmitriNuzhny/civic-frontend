import { useState } from "react";
import { useRouter } from "next/navigation";
import { ResponsiveContainer } from "recharts";
import { LineChart } from "recharts";
import { CartesianGrid } from "recharts";
import { XAxis } from "recharts";
import { YAxis } from "recharts";
import { Tooltip } from "recharts";
import { Line } from "recharts";
import { Area } from "recharts";
import { ReferenceDot } from "recharts";
import { Button } from "../ui/button";

const TokenInformation = () => {
  const [timeFilter, setTimeFilter] = useState("Live");
  const router = useRouter();

  // Token price chart data
  const tokenChartData = [
    { time: "0", price: 0.3 },
    { time: "1", price: 0.25 },
    { time: "2", price: 0.4 },
    { time: "3", price: 0.9 },
    { time: "4", price: 0.95 },
    { time: "5", price: 0.7 },
    { time: "6", price: 0.72 },
    { time: "7", price: 0.9 },
    { time: "8", price: 0.8 },
    { time: "9", price: 0.5 },
    { time: "10", price: 0.8 },
    { time: "11", price: 1.2 },
    { time: "12", price: 1.4 },
    { time: "13:40", price: 1.5 },
    { time: "14:21", price: 2 },
    { time: "15:02", price: 2 },
    { time: "15:43", price: 2.3 },
    { time: "16:24", price: 1.8 },
    { time: "17:05", price: 2.1 },
    { time: "17:46", price: 2 },
    { time: "18:27", price: 2.1 },
    { time: "19:08", price: 2.12 },
    { time: "19:49", price: 1.9 },
    { time: "20:30", price: 1.2 },
    { time: "21:11", price: 1.9 },
    { time: "21:52", price: 1.9 },
    { time: "22:33", price: 2.8 },
    { time: "23:14", price: 3.3045 },
  ];

  const tokenInformationData = [
    { label: "TOKEN PRICE", value: "$3.31" },
    { label: "TOKENIZED EQUITY", value: "15.89%" },
    { label: "LOOK UP", value: "5 Years" },
    { label: "QUANTITY", value: "5,000,000" },
    { label: "AVERAGE COST", value: "$2.99" },
    { label: "QSBS", value: "Confirmed" },
  ];

  const timeFilterData = [
    { label: "Live", value: "Live" },
    { label: "1D", value: "1D" },
    { label: "1W", value: "1W" },
    { label: "1M", value: "1M" },
    { label: "3M", value: "3M" },
    { label: "All", value: "All" },
  ];
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="border-b border-[#384051]">
        <h2 className="text-[#0FE2D4] text-lg font-semibold border-b border-[#0FE2D4] p-3 inline-block">
          TOKEN INFORMATION
        </h2>
      </div>

      <div className="flex flex-wrap justify-between">
        {tokenInformationData.map((item, index) => (
          <div key={index} className="flex flex-col gap-3">
            <div className="text-[#AAAAAA] text-base">{item.label}</div>
            <div className="text-4xl font-bold text-white">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Price Chart Section */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="text-5xl font-bold text-white">$ 3.3045</div>
            <div className="text-white font-semibold text-base">
              CIVICFORGE <span className="text-[#0FE2D4]">+1.02%</span>
            </div>
          </div>
          <Button
            onClick={() => router.push("/buytoken")}
            className="px-6 py-3 bg-[#0FE2D4] text-black rounded font-bold hover:bg-[#0FE2D4]/80 transition-colors"
          >
            Buy CF Tokens
          </Button>
        </div>
        <div className="flex">
          {timeFilterData.map((item, index) => (
            <button
              key={index}
              className={`text-base px-4 py-1.5 rounded-full font-medium ${
                timeFilter === item.value
                  ? "bg-[#0FE2D4] text-[#0D111D]"
                  : "bg-transparent text-white"
              }`}
              onClick={() => setTimeFilter(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="relative h-[400px] w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
          minWidth={0}
          minHeight={400}
        >
          <LineChart data={tokenChartData} margin={{ top: 20, right: 10 }}>
            <defs>
              <linearGradient
                id="priceGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0%" stopColor="#0FE2D4" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#0FE2D4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#212A38"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={false}
            />
            <YAxis
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
              tickFormatter={(value) => value.toFixed(2)}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#AAAAAA", fontSize: 24 }}
              label={{
                angle: -90,
                position: "insideLeft",
                fill: "#AAAAAA",
                fontSize: 18,
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0D111D",
                borderColor: "#384051",
                borderRadius: "8px",
                color: "#FFFFFF",
              }}
              labelStyle={{ color: "#AAAAAA" }}
              formatter={(value: number) => [`$${value.toFixed(4)}`, "Price"]}
            />
            <Area
              type="linear"
              dataKey="price"
              stroke="none"
              fill="url(#priceGradient)"
            />
            <Line
              type="linear"
              dataKey="price"
              stroke="#0FE2D4"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#0FE2D4" }}
            />
            <ReferenceDot
              x={tokenChartData[tokenChartData.length - 1].time}
              y={tokenChartData[tokenChartData.length - 1].price}
              r={6}
              fill="#0FE2D4"
              stroke="none"
            />
          </LineChart>
        </ResponsiveContainer>
        {/* Current Value Box */}
        <div className="absolute left-2 top-[110px] bg-[#0FE2D4] p-1">
          <span className="text-[#111111] font-semibold text-xl">3.3045</span>
        </div>
        {/* Percentage Change Indicator */}
        <div className="absolute top-28 right-4 flex items-center gap-1">
          <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-[6px] border-b-[#0FE2D4]"></div>
          <span className="text-[#0FE2D4] font-semibold text-sm">+ 1.02%</span>
        </div>
      </div>
    </div>
  );
};
export default TokenInformation;
