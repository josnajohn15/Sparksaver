import { useLocation, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import '../App.css';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
  '#a29bfe', '#d63031', '#6c5ce7', '#e17055',
  '#2ecc71', '#fd79a8', '#e84393', '#00b894',
];

const ResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <h3>No data found. Go back and fill the form.</h3>;

  const { totalUsage, cost, devices } = state;

  // Prepare data for chart
  const chartData = devices.map((d) => {
    const usage = ((d.wattage * d.hours * 30) / 1000); // kWh
    return {
      name: `${d.appliance} (${d.brand})`,
      value: usage,
    };
  });

  return (
    <div className="container">
      <div className="card">
        <h2>📊 Usage Summary</h2>

        <ul>
          {devices.map((d, i) => (
            <li key={i}>
              {d.appliance} ({d.brand}) - {d.hours} hrs/day → {((d.wattage * d.hours * 30) / 1000).toFixed(2)} kWh
            </li>
          ))}
        </ul>

        <p><b>Total Monthly Usage:</b> {totalUsage.toFixed(2)} kWh</p>
        <p><b>Total Estimated Cost:</b> ₹{cost}</p>

        <h3>📈 Consumption Distribution</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>

        <button onClick={() => navigate("/")}>🔙 Back</button>
      </div>
    </div>
  );
};

export default ResultPage;
