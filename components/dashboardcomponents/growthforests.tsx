"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Helper function to convert k/M to millions
const convertToMillions = (value: string): number => {
  if (value.includes("k")) {
    return parseFloat(value.replace("$", "").replace("k", "")) / 1000;
  }
  if (value.includes("M")) {
    return parseFloat(value.replace("$", "").replace("M", ""));
  }
  return parseFloat(value.replace("$", "").replace("K", "")) / 1000;
};

// Piecewise scale function for Y-axis
// Maps actual values to transformed values for equal visual differences
const transformValue = (value: number): number => {
  if (value <= 2) {
    // Linear scaling for -1 to 2 (covering -1, 0, 1, 2)
    // Map -1 to 0, 2 to 3 (in transformed space)
    return value + 1; // -1 -> 0, 0 -> 1, 1 -> 2, 2 -> 3
  } else {
    // Logarithmic-like scaling for 2 to 32 (covering 2, 4, 8, 16, 32)
    // Each doubling gets equal visual space
    // Map 2 -> 3, then log base 2 for the rest
    const logBase2 = Math.log2(value / 2);
    return 3 + logBase2; // 2 -> 3, 4 -> 4, 8 -> 5, 16 -> 6, 32 -> 7
  }
};

// Inverse transform: convert transformed value back to actual value
const inverseTransformValue = (transformed: number): number => {
  if (transformed <= 3) {
    // Linear inverse for -1 to 2 range
    return transformed - 1;
  } else {
    // Logarithmic inverse for 2 to 32 range
    const logBase2 = transformed - 3;
    return 2 * Math.pow(2, logBase2);
  }
};

const rawGrowthData = [
  {
    year: "2026",
    label: "Pre-MVP traction year",
    revenue: convertToMillions("84k"),
    profit: convertToMillions("-386K"),
  },
  {
    year: "2027",
    label: "Platform live, early issuers onboard",
    revenue: convertToMillions("126k"),
    profit: convertToMillions("-560K"),
  },
  {
    year: "2028",
    label: "Expansion beyond veterans; secondary trading begins",
    revenue: convertToMillions("22.6M"),
    profit: convertToMillions("13.5M"),
  },
  {
    year: "2029",
    label: "Platform maturity phase",
    revenue: convertToMillions("23.8M"),
    profit: convertToMillions("13.7M"),
  },
  {
    year: "2030",
    label: "Scale as national infrastructure",
    revenue: convertToMillions("30.5M"),
    profit: convertToMillions("17.4M"),
  },
];

// Transform data values for piecewise scaling
// Shift values relative to 0 so bars start from 0 line
const zeroTransform = transformValue(0);
const growthData = rawGrowthData.map((item) => ({
  ...item,
  revenue: transformValue(item.revenue) - zeroTransform,
  profit: transformValue(item.profit) - zeroTransform,
  // Store original values for labels
  originalRevenue: item.revenue,
  originalProfit: item.profit,
}));

// Find min and max values from the data dynamically
const allValues = rawGrowthData.flatMap((item) => [item.revenue, item.profit]);
const minValue = Math.min(...allValues);
const maxValue = Math.max(...allValues);

// Generate dynamic ticks based on data range - fully responsive
const generateTicks = () => {
  const tickSet = new Set<number>([-1, 0, 1, 2]);

  const positiveLimit = Math.max(2, maxValue * 1.2);
  let positiveTick = 4;
  while (positiveTick <= positiveLimit) {
    tickSet.add(positiveTick);
    positiveTick *= 2;
  }

  if (minValue < 0) {
    const negativeLimit = Math.max(1, Math.abs(minValue) * 1.2);
    let negativeTick = -2;
    while (Math.abs(negativeTick) <= negativeLimit) {
      tickSet.add(negativeTick);
      negativeTick *= 2;
    }
  }

  return Array.from(tickSet).sort((a, b) => a - b);
};

const ticks = generateTicks();
const transformedTicks = ticks.map((t) => transformValue(t) - zeroTransform);

// Calculate domain with 20% padding on each end
const minTick = Math.min(...ticks);
const maxTick = Math.max(...ticks);
const transformedDomain = [
  transformValue(minTick) - zeroTransform,
  transformValue(maxTick) - zeroTransform,
];

// Custom Y-axis tick formatter
const formatYAxis = (value: number) => {
  if (value === 0) return "0";
  if (Math.abs(value) < 1) {
    return `${value > 0 ? "" : "-"}${Math.abs(value * 1000)}k`;
  }
  return `${value > 0 ? "" : "-"}${Math.abs(value)}M`;
};

// Custom label formatter for bars
const formatBarLabel = (value: number) => {
  if (Math.abs(value) < 1) {
    return `${value > 0 ? "" : "-"}${Math.abs(value * 1000).toFixed(0)}k`;
  }
  return `${value > 0 ? "" : "-"}${Math.abs(value).toFixed(1)}M`;
};

// Helper function to split text into multiple lines
const splitTextIntoLines = (
  text: string,
  maxCharsPerLine: number = 40
): string[] => {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    if ((currentLine + word).length <= maxCharsPerLine) {
      currentLine += (currentLine ? " " : "") + word;
    } else {
      if (currentLine) {
        lines.push(currentLine);
      }
      currentLine = word;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.length > 0 ? lines : [text];
};

// Custom Y-axis tick component that transforms back for display
const CustomYAxisTick = ({ x, y, payload }: any) => {
  // Convert from shifted space back to original space
  const shiftedValue = payload.value;
  const transformedValue = shiftedValue + zeroTransform;
  const originalValue = inverseTransformValue(transformedValue);
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={-10}
        y={5}
        textAnchor="end"
        fill="#AAAAAA"
        fontSize={14}
        fontWeight={500}
      >
        {formatYAxis(originalValue)}
      </text>
    </g>
  );
};

// Custom X-axis tick with year and label
const CustomXAxisTick = ({ x, y, payload }: any) => {
  const data = growthData[payload.index];
  const labelLines = splitTextIntoLines(data.label, 30);
  const lineHeight = 22; // Space between lines

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize={18}
        fontWeight={500}
      >
        {data.year}
      </text>
      {labelLines.map((line, index) => (
        <text
          key={index}
          x={0}
          y={0}
          dy={48 + index * lineHeight}
          textAnchor="middle"
          fill="white"
          fontSize={18}
        >
          {line}
        </text>
      ))}
    </g>
  );
};

const GrowthForests = () => {
  return (
    <motion.div
      className="overflow-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <ResponsiveContainer width="100%" height={725} minWidth={1200}>
        <BarChart data={growthData} margin={{ top: 20 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#212A38"
            vertical={false}
          />
          <XAxis
            dataKey="year"
            tick={<CustomXAxisTick />}
            axisLine={{ stroke: "#384051" }}
            tickLine={false}
            height={120}
          />
          <YAxis
            domain={transformedDomain}
            ticks={transformedTicks}
            tick={<CustomYAxisTick />}
            axisLine={{ stroke: "#384051" }}
            tickLine={false}
            label={{
              angle: -90,
              position: "insideLeft",
              fill: "#AAAAAA",
              fontSize: 12,
            }}
          />
          <Bar />
          <Bar
            dataKey="revenue"
            name="Revenue"
            radius={[8, 8, 8, 8]}
            width={32}
            label={(props: any) => {
              const originalValue =
                (props.payload as any)?.originalRevenue ||
                inverseTransformValue(props.value + zeroTransform);
              return (
                <text
                  x={props.x + props.width / 2}
                  y={props.y - 5}
                  fill="#0FE2D4"
                  fontSize={18}
                  fontWeight={500}
                  textAnchor="middle"
                >
                  {formatBarLabel(originalValue)}
                </text>
              );
            }}
          >
            {growthData.map((entry, index) => (
              <Cell key={`cell-revenue-${index}`} fill="#0FE2D4" />
            ))}
          </Bar>
          <Bar />
          <Bar
            dataKey="profit"
            name="Profit/Loss"
            radius={[8, 8, 8, 8]}
            width={32}
            label={(props: any) => {
              const originalValue =
                (props.payload as any)?.originalProfit ||
                inverseTransformValue(props.value + zeroTransform);
              const isNegative = originalValue < 0;
              return (
                <text
                  x={props.x + props.width / 2}
                  y={isNegative ? props.y + 18 : props.y - 5}
                  fill={isNegative ? "#EF4444" : "#22C55E"}
                  fontSize={18}
                  fontWeight={500}
                  textAnchor="middle"
                >
                  {formatBarLabel(originalValue)}
                </text>
              );
            }}
          >
            {growthData.map((entry, index) => (
              <Cell
                key={`cell-profit-${index}`}
                fill={(entry as any).originalProfit < 0 ? "#EF4444" : "#22C55E"}
              />
            ))}
          </Bar>
          <Bar />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
export default GrowthForests;
