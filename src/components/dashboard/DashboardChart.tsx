import { useMemo } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

interface DashboardChartProps {
  data: {
    date: string;
    credits: number;
    apiCalls: number;
  }[];
}

export function DashboardChart({ data }: DashboardChartProps) {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full h-[300px] sm:h-[350px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCredits" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(243, 75%, 59%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(243, 75%, 59%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorApiCalls" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 10%, 88%)" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: 'hsl(20, 10%, 40%)' }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 12, fill: 'hsl(20, 10%, 40%)' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(40, 10%, 98%)',
              border: '1px solid hsl(40, 10%, 88%)',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            labelStyle={{ fontWeight: 600, marginBottom: 4 }}
          />
          <Area
            type="monotone"
            dataKey="credits"
            stroke="hsl(243, 75%, 59%)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorCredits)"
            name="Credits Used"
          />
          <Area
            type="monotone"
            dataKey="apiCalls"
            stroke="hsl(160, 84%, 39%)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorApiCalls)"
            name="API Calls"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
