import { useLocation, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../App.css';
import { useEffect, useState } from 'react';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
  '#a29bfe', '#d63031', '#6c5ce7', '#e17055',
  '#2ecc71', '#fd79a8', '#e84393', '#00b894',
];

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [animatedTotal, setAnimatedTotal] = useState(0);

  if (!state) return <h3>No data found. Go back and fill the form.</h3>;

  const { totalUsage, cost, devices } = state;

  const chartData = devices.map((d) => {
    const usage = ((d.wattage * d.hours * 30) / 1000);
    return {
      name: `${d.appliance} (${d.brand})`,
      value: usage,
    };
  });

  // Animate number for Total Usage
  useEffect(() => {
    let start = 0;
    const step = totalUsage / 50;
    const interval = setInterval(() => {
      start += step;
      setAnimatedTotal(prev => {
        if (prev >= totalUsage) {
          clearInterval(interval);
          return totalUsage;
        }
        return start;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [totalUsage]);

  // Download CSV function
  const downloadCSV = () => {
    const headers = ["Appliance", "Brand", "Wattage (W)", "Hours/Day", "Monthly Usage (kWh)"];
    const rows = devices.map((d) => [
      d.appliance,
      d.brand,
      d.wattage,
      d.hours,
      ((d.wattage * d.hours * 30) / 1000).toFixed(2)
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "spark_usage_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container fade-in">
      <div className="card glowing-border">
        <h2>⚡ SparkSaver - Energy Usage Summary</h2>

        <ul>
          {devices.map((d, i) => (
            <li key={i}>
              {d.appliance} ({d.brand}) – {d.hours} hrs/day → {((d.wattage * d.hours * 30) / 1000).toFixed(2)} kWh
            </li>
          ))}
        </ul>

        <p><b>💡 Total Monthly Usage:</b> {animatedTotal.toFixed(2)} kWh</p>
        <p><b>💰 Estimated Cost:</b> ₹{cost}</p>

        <button onClick={downloadCSV} className="csv-btn">⬇️ Download Usage CSV</button>

        <h3 style={{ marginTop: "2rem" }}>📈 Interactive Consumption Breakdown</h3>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={3}
              dataKey="value"
              isAnimationActive={true}
              animationDuration={1500}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        <button onClick={() => navigate("/dashboard")} className="back-btn">🔙 Back</button>
      </div>
    </div>
  );
};

export default Result;
