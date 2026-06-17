import React from "react";
import { AppContext } from "../context/AppContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, Label } from "recharts";

export function AppliationsChart() {
  const { apps } = React.useContext(AppContext);

  const applied = apps.filter(app => app.status === "Applied").length;
  const shortListed = apps.filter(app => app.status === "Shortlisted").length;
  const interviews = apps.filter(app => app.status === "Interview").length;
  const offers = apps.filter(app => app.status === "Offer").length;
  const rejected = apps.filter(app => app.status === "Rejected").length;
  const total = apps.length;

  const data = [
    { name: "Applied", value: applied, color: "#3b82f6" },
    { name: "Short Listed", value: shortListed, color: "#eab308" },
    { name: "Interviews", value: interviews, color: " #22c55e" },
    { name: "Offers", value: offers, color: "#166534" },
    { name: "Rejected", value: rejected, color: "#ef4444" },
    { name: "Yet to Apply", value: Math.max(0, 0), color: "#d1d5db" }, // optional placeholder
  ].filter(item => item.value > 0);

  const CenterLabel = ({ viewBox }) => {
    const { cx, cy } = viewBox;
    return (
      <>
        <text x={cx} y={cy - 6} textAnchor="middle" dominantBaseline="middle"
          style={{ fontSize: "28px", fontWeight: "700", fill: "#111827" }}>
          {total}
        </text>
        <text x={cx} y={cy + 20} textAnchor="middle" dominantBaseline="middle"
          style={{ fontSize: "13px", fill: "#6b7280" }}>
          Total
        </text>
      </>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow p-5 h-full">
      {/* Header */}
      <h3 className="font-bold text-lg text-[#264653]">Application Progress</h3>
      <p className="mb-4 text-sm text-gray-500">Track your progress across all stages</p>

      {data.length === 0 ? (
        <div className="flex items-center justify-center h-[200px] text-gray-500">
          No applications yet
        </div>
      ) : (
        <div className="flex items-center gap-4">
          {/* Donut Chart */}
          <div className="w-[200px] h-[200px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={95}
                  startAngle={120}
                  endAngle={-270}
                  label={false}
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <Label content={<CenterLabel />} position="center" />
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Custom Legend */}
          <div className="flex flex-col ml-8 gap-2 flex-1">
            {[
              { name: "Applied", value: applied, color: "#3b82f6" },
              { name: "Short Listed", value: shortListed, color: "#eab308" },
              { name: "Interviews", value: interviews, color: "#22c55e" },
              { name: "Offers", value: offers, color: " #166534" },
              { name: "Rejected", value: rejected, color: "#ef4444" },
            ].map((item) => {
              const percent = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
              return (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-700 font-medium">{item.name}</span>
                  </div>
                  <span className="text-gray-500 font-medium mr-4">
                    {item.value} ({percent}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}