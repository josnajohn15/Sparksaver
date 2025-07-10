import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Dashboard.css' 


const applianceData = {
  Fan: {
    Orient: 75,
    Crompton: 80,
    Usha: 65,
    Bajaj: 70,
    Havells: 78,
  },
  Light: {
    Philips: 9,
    Syska: 12,
    Wipro: 10,
    Eveready: 11,
    Crompton: 13,
  },
  TubeLight: {
    Philips: 36,
    Syska: 40,
    Wipro: 38,
    Bajaj: 39,
  },
  AC: {
    LG: 1500,
    Voltas: 1400,
    Samsung: 1600,
    BlueStar: 1700,
    Daikin: 1650,
  },
  Refrigerator: {
    Samsung: 200,
    LG: 180,
    Whirlpool: 210,
    Haier: 190,
    Godrej: 205,
  },
  WashingMachine: {
    LG: 500,
    IFB: 450,
    Whirlpool: 480,
    Bosch: 460,
    Samsung: 470,
  },
  TV: {
    Sony: 120,
    Samsung: 110,
    LG: 100,
    OnePlus: 95,
    Panasonic: 105,
  },
  Geyser: {
    Bajaj: 2000,
    Racold: 2200,
    Crompton: 2300,
    AO_Smith: 2100,
    VGuard: 2400,
  },
  Microwave: {
    IFB: 1200,
    Samsung: 1300,
    LG: 1250,
    Whirlpool: 1150,
    MorphyRichards: 1350,
  },
  Laptop: {
    Dell: 65,
    HP: 60,
    Lenovo: 55,
    Asus: 50,
    Apple: 45,
  },
  MobileCharger: {
    Samsung: 10,
    Apple: 12,
    OnePlus: 15,
    Xiaomi: 10,
    Realme: 10,
  },
  IronBox: {
    Philips: 1000,
    Bajaj: 1100,
    Havells: 1200,
    Crompton: 1150,
    Usha: 1250,
  },
  MixerGrinder: {
    Preethi: 750,
    Philips: 700,
    Bajaj: 800,
    MorphyRichards: 850,
    Panasonic: 780,
  },
  Motor: {
    Kirloskar: 750,
    Crompton: 800,
    Texmo: 1000,
    VGuard: 850,
  },
  Oven: {
    IFB: 1400,
    Samsung: 1350,
    LG: 1500,
    MorphyRichards: 1300,
  },
  Grinder: {
    Preethi: 500,
    Philips: 550,
    Bajaj: 600,
    Panasonic: 580,
  },
  Kettle: {
    Prestige: 1200,
    Philips: 1500,
    Bajaj: 1350,
    Havells: 1400,
  },
  InductionCooker: {
    Prestige: 1800,
    Pigeon: 2000,
    Philips: 2100,
    Butterfly: 1900,
  },
  HairStraightener: {
    Philips: 45,
    Havells: 50,
    Syska: 40,
    Vega: 48,
  },
  Inverter: {
    Luminous: 50,
    Microtek: 45,
    SuKam: 55,
    VGuard: 50,
  },
  ElectricVehicle: {
    Ather: 3000,
    Ola: 3500,
    Hero: 2800,
    TVS: 3200,
  },
  Heater: {
    Bajaj: 2000,
    Usha: 2200,
    Orpat: 1800,
    Havells: 2100,
  },
  WaterPurifier: {
    Kent: 40,
    Aquaguard: 50,
    Pureit: 30,
  },
  AirPurifier: {
    Dyson: 60,
    Philips: 55,
    Xiaomi: 50,
  },
  Toaster: {
    Prestige: 900,
    MorphyRichards: 1000,
    Bajaj: 950,
  },
  Blender: {
    Nutribullet: 600,
    Philips: 550,
    Bajaj: 500,
  },
  RoomCooler: {
    Symphony: 150,
    Bajaj: 170,
    Crompton: 160,
  },
  Dishwasher: {
    Bosch: 1500,
    IFB: 1400,
    LG: 1450,
  },
  VacuumCleaner: {
    EurekaForbes: 1400,
    Dyson: 1600,
    Philips: 1300,
  },
  CoffeeMaker: {
    Philips: 1000,
    MorphyRichards: 1200,
    Bajaj: 1100,
  },
  HairDryer: {
    Philips: 1500,
    Havells: 1800,
    Dyson: 1600,
  },
  SmartSpeaker: {
    AmazonEcho: 6,
    GoogleNest: 5,
    AppleHomePod: 7,
  },
  Printer: {
    HP: 40,
    Canon: 35,
    Epson: 45,
  },
  ElectricBlanket: {
    Orpat: 90,
    Crompton: 80,
  },
  Humidifier: {
    AGARO: 40,
    Philips: 45,
    Honeywell: 50,
  },
  Treadmill: {
    Fitkit: 1800,
    Powermax: 2000,
    Durafit: 2200,
  },
  SmartTVBox: {
    FireTV: 10,
    Chromecast: 8,
    MiBox: 7,
  },
  Router: {
    TPLink: 10,
    DLink: 12,
    JioFiber: 11,
  },
  TableFan: {
    Usha: 55,
    Havells: 50,
    Bajaj: 60,
  },
  CeilingLight: {
    Crompton: 15,
    Philips: 18,
    Wipro: 20,
  }
};

const Dashboard = () => {
  const [appliance, setAppliance] = useState("");
  const [brand, setBrand] = useState("");
  const [hours, setHours] = useState("");
  const [savedDevices, setSavedDevices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("devices");
    if (stored) setSavedDevices(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("devices", JSON.stringify(savedDevices));
  }, [savedDevices]);

  const handleAddDevice = () => {
    if (!appliance || !brand || !hours) {
      alert("⚠ Please fill all fields");
      return;
    }
    const wattage = applianceData[appliance][brand];
    const newDevice = {
      id: Date.now(),
      appliance,
      brand,
      hours: Number(hours),
      wattage,
    };
    setSavedDevices([...savedDevices, newDevice]);
    setAppliance("");
    setBrand("");
    setHours("");
  };

  const handleDelete = (id) => {
    setSavedDevices(savedDevices.filter((d) => d.id !== id));
  };

  const handleCalculate = async () => {
    const totalUsage = savedDevices.reduce((sum, d) => {
      return sum + ((d.wattage * d.hours) / 1000) * 30;
    }, 0);
    const cost = (totalUsage * 6.5).toFixed(2);

    const token = localStorage.getItem("token");
    if (!token) return alert("Please login to save your data");

    try {
      await axios.post(
        "http://localhost:5000/api/device/save",
        { devices: savedDevices },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("❌ Failed to save devices:", err.response?.data || err.message);
    
    }

    navigate("/result", {
      state: {
        totalUsage,
        cost,
        devices: savedDevices,
      },
    });
  };

  return (
    <div className="container">
      <div className="electric-effect-background"></div>

      <div className="card">
        <h2>🔌 Add Appliance</h2>

        <select value={appliance} onChange={(e) => setAppliance(e.target.value)}>
          <option value="">-- Select Appliance --</option>
          {Object.keys(applianceData).map((a, i) => (
            <option key={i} value={a}>{a}</option>
          ))}
        </select>

        {appliance && (
          <>
            <select value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value="">-- Select Brand --</option>
              {Object.keys(applianceData[appliance]).map((b, i) => (
                <option key={i} value={b}>{b}</option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Hours used per day"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />

            <button onClick={handleAddDevice}>💾 Save Device</button>
          </>
        )}

        <hr style={{ margin: "1rem 0", borderColor: "#444" }} />

        <h3>📋 Saved Devices</h3>
        {savedDevices.length === 0 ? (
          <p>No devices saved yet.</p>
        ) : (
          savedDevices.map((d) => (
            <div key={d.id} style={{ marginBottom: "0.5rem", background: "#333", color: "#fff", padding: "0.5rem", borderRadius: "6px" }}>
              <span>{d.appliance} ({d.brand}) – {d.hours}h/day</span>
              <button
                onClick={() => handleDelete(d.id)}
                style={{
                  float: "right",
                  background: "#ff4d4d",
                  border: "none",
                  color: "#fff",
                  borderRadius: "4px",
                  padding: "2px 8px",
                  cursor: "pointer"
                }}
              >
                🗑
              </button>
            </div>
          ))
        )}

        {savedDevices.length > 0 && (
          <button onClick={handleCalculate}>🚀 Calculate Total Usage</button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
