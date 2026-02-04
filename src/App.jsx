import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Settings, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Menu, 
  ChevronRight,
  PieChart,
  Search,
  RefreshCw,
  Users // Added for Client icon
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// --- CONFIGURATION ---
const OPS_CSV_URL = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTBAoVnLtcuzr_uYVj5xGVPE68I-WkDcYGXx_It_pFsY21fztEVA8M7ACq_JODDM2E2ZLKy7rfaDiT2/pub?gid=81945691&single=true&output=csv`;
const REG_CSV_URL = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTBAoVnLtcuzr_uYVj5xGVPE68I-WkDcYGXx_It_pFsY21fztEVA8M7ACq_JODDM2E2ZLKy7rfaDiT2/pub?gid=1678666116&single=true&output=csv`;

// --- INITIAL DATA (Fallbacks) ---
const INITIAL_OPERATIONS_DATA = [
  { id: 1, type: 'OPERATIONS', name: 'Client Services Workflow', code: '1100_CLIENT', policy: 0, evidence: 100 },
  { id: 2, type: 'OPERATIONS', name: 'Compliance Workflow', code: '1200_COMPLIANCE', policy: 77, evidence: 69 },
];

const INITIAL_REGULATIONS_DATA = [
  { id: 101, type: 'REGULATION', name: 'Anti-Money Laundering', code: '2010_AML', policy: 100, evidence: 92 },
  { id: 102, type: 'REGULATION', name: 'Consumer Protection Code', code: '2020_CPC', policy: 100, evidence: 93 },
];

// --- CLIENT DATA (Static) ---
const CLIENTS_DATA = [
  { id: 1, type: 'CLIENT', name: 'Donal Milmo-Penny', kyc: 100, terms: 100, aml: 100, suitability: 100, policy: 100, annual: 100 },
  { id: 2, type: 'CLIENT', name: 'Garfield Spollen', kyc: 100, terms: 100, aml: 100, suitability: 100, policy: 100, annual: 100 },
  { id: 3, type: 'CLIENT', name: 'Norah McNulty', kyc: 100, terms: 100, aml: 100, suitability: 100, policy: 100, annual: 100 },
  { id: 4, type: 'CLIENT', name: 'Paul Looby', kyc: 100, terms: 100, aml: 100, suitability: 100, policy: 100, annual: 100 },
  { id: 5, type: 'CLIENT', name: 'Stephen Morgan', kyc: 100, terms: 100, aml: 100, suitability: 100, policy: 100, annual: 100 },
  { id: 6, type: 'CLIENT', name: 'John English', kyc: 100, terms: 100, aml: 100, suitability: 100, policy: 100, annual: 100 },
];

// --- UTILITIES ---
const getRAGStatus = (percentage) => {
  // RAG Logic: > 70 Green, 50-70 Orange, < 50 Red
  if (percentage > 70) return { color: 'bg-emerald-600', text: 'text-emerald-800', bg: 'bg-emerald-50', border: 'border-emerald-200', label: 'Compliant' };
  if (percentage >= 50) return { color: 'bg-orange-500', text: 'text-orange-800', bg: 'bg-orange-50', border: 'border-orange-200', label: 'At Risk' };
  return { color: 'bg-red-600', text: 'text-red-800', bg: 'bg-red-50', border: 'border-red-200', label: 'Critical' };
};

const parsePercentage = (val) => {
  if (val === null || val === undefined) return 0;
  const strVal = val.toString().replace('%', '').trim();
  const num = parseFloat(strVal);
  return isNaN(num) ? 0 : Math.round(num);
};

const parseCSV = (text) => {
  const rows = text.split(/\r?\n/).filter(row => row.trim() !== '');
  return rows.slice(1).map(row => {
    const values = [];
    let inQuote = false;
    let currentVal = '';
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      if (char === '"') {
        inQuote = !inQuote;
      } else if (char === ',' && !inQuote) {
        values.push(currentVal.trim());
        currentVal = '';
      } else {
        currentVal += char;
      }
    }
    values.push(currentVal.trim());
    return values;
  });
};

const ProgressBar = ({ value, showLabel = true }) => {
  const status = getRAGStatus(value);
  return (
    <div className="w-full flex items-center gap-2">
      <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${status.color} transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
      {showLabel && <span className={`text-[10px] font-bold w-7 text-right ${status.text}`}>{value}%</span>}
    </div>
  );
};

const StatusBadge = ({ pScore, eScore }) => {
  const avg = (pScore + eScore) / 2;
  const status = getRAGStatus(avg);
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${status.bg} ${status.text} ${status.border}`}>
      {status.label}
    </span>
  );
};

const StatCard = ({ title, value, subtext, icon: Icon, trend }) => (
  <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-neutral-500">{title}</p>
        <h3 className="text-2xl font-bold text-neutral-900 mt-2">{value}</h3>
      </div>
      <div className="p-2 bg-neutral-100 rounded-lg">
        <Icon className="w-6 h-6 text-red-600" />
      </div>
    </div>
    <div className="mt-4 flex items-center">
      {trend && (
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
          {trend === 'up' ? '▲ High' : '▼ Attention'}
        </span>
      )}
      <span className="text-sm text-neutral-500 ml-2">{subtext}</span>
    </div>
  </div>
);

// --- DASHBOARD COMPONENTS ---

const DashboardTable = ({ title, data }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      <div className="p-6 border-b border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            {data[0]?.type === 'OPERATIONS' ? <Settings className="w-5 h-5 text-neutral-600" /> : <ShieldCheck className="w-5 h-5 text-red-600" />}
            {title}
          </h2>
          <p className="text-sm text-neutral-500 mt-1">Monitoring compliance status across key areas.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 text-neutral-600 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold border-b border-neutral-200">Ref Code</th>
              <th className="p-4 font-semibold border-b border-neutral-200">Area</th>
              <th className="p-4 font-semibold border-b border-neutral-200 w-48">Policy</th>
              <th className="p-4 font-semibold border-b border-neutral-200 w-48">Evidence</th>
              <th className="p-4 font-semibold border-b border-neutral-200 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filteredData.map((row) => (
              <tr key={row.id} className="hover:bg-neutral-50 transition-colors">
                <td className="p-4 text-sm font-mono text-neutral-500">{row.code.split(' ')[0]}</td>
                <td className="p-4">
                  <div className="font-medium text-neutral-900">{row.name}</div>
                  <div className="text-xs text-neutral-400">{row.code}</div>
                </td>
                <td className="p-4">
                  <ProgressBar value={row.policy} />
                </td>
                <td className="p-4">
                  <ProgressBar value={row.evidence} />
                </td>
                <td className="p-4 text-center">
                  <StatusBadge pScore={row.policy} eScore={row.evidence} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredData.length === 0 && (
        <div className="p-8 text-center text-neutral-500 text-sm">
          No records found.
        </div>
      )}
    </div>
  );
};

const ClientDashboardTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper for small column headers
  const Th = ({ children }) => (
    <th className="p-3 font-semibold border-b border-neutral-200 w-32 text-center align-bottom">
      {children}
    </th>
  );

  // Helper for cells
  const Td = ({ value }) => {
    // Get correct RAG colors: <50 Red, 50-70 Orange, >70 Green
    const status = getRAGStatus(value);
    
    return (
      <td className="p-3 border-b border-neutral-100">
        <div className="flex flex-col items-center">
          <span className={`text-xs font-bold mb-1 ${status.text}`}>{value}%</span>
          <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
             <div className={`h-full rounded-full ${status.color} transition-all duration-500`} style={{ width: `${value}%` }} />
          </div>
        </div>
      </td>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      <div className="p-6 border-b border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-red-600" />
            Client Monitoring Dashboard
          </h2>
          <p className="text-sm text-neutral-500 mt-1">Real-time status of client documentation and compliance.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search broker name..." 
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-neutral-50 text-neutral-600 text-[10px] uppercase tracking-wider leading-tight">
              <th className="p-4 font-semibold border-b border-neutral-200 w-48 text-left">Broker Name</th>
              <Th>KYC Fact Find</Th>
              <Th>Terms of Business</Th>
              <Th>AML ID</Th>
              <Th>Suitability Statement</Th>
              <Th>Signed Policy</Th>
              <Th>Annual Benefits</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filteredData.map((row) => (
              <tr key={row.id} className="hover:bg-neutral-50 transition-colors">
                <td className="p-4">
                  <div className="font-medium text-neutral-900 text-sm">{row.name}</div>
                  <div className="text-[10px] text-neutral-400 uppercase font-mono">ID: {row.id}</div>
                </td>
                <Td value={row.kyc} />
                <Td value={row.terms} />
                <Td value={row.aml} />
                <Td value={row.suitability} />
                <Td value={row.policy} />
                <Td value={row.annual} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SummaryDashboard = ({ opsData, regData }) => {
  const allData = [...opsData, ...regData];
  const totalItems = allData.length;
  
  const avgPolicy = totalItems ? Math.round(allData.reduce((acc, curr) => acc + curr.policy, 0) / totalItems) : 0;
  const avgEvidence = totalItems ? Math.round(allData.reduce((acc, curr) => acc + curr.evidence, 0) / totalItems) : 0;
  const totalCompliance = Math.round((avgPolicy + avgEvidence) / 2);

  const criticalItems = allData.filter(i => ((i.policy + i.evidence) / 2) < 50);
  const atRiskItems = allData.filter(i => {
    const avg = (i.policy + i.evidence) / 2;
    return avg >= 50 && avg <= 70; 
  });

  const chartData = [
    { 
      name: 'Operations', 
      policy: opsData.length ? Math.round(opsData.reduce((a, b) => a + b.policy, 0) / opsData.length) : 0, 
      evidence: opsData.length ? Math.round(opsData.reduce((a, b) => a + b.evidence, 0) / opsData.length) : 0
    },
    { 
      name: 'Regulation', 
      policy: regData.length ? Math.round(regData.reduce((a, b) => a + b.policy, 0) / regData.length) : 0, 
      evidence: regData.length ? Math.round(regData.reduce((a, b) => a + b.evidence, 0) / regData.length) : 0 
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Overall Compliance" value={`${totalCompliance}%`} subtext="Combined Average" icon={ShieldCheck} trend={totalCompliance > 80 ? 'up' : 'down'} />
        <StatCard title="Frameworks Monitored" value={totalItems} subtext={`${opsData.length} Ops, ${regData.length} Regs`} icon={LayoutDashboard} />
        <StatCard title="Critical Gaps" value={criticalItems.length} subtext="Items < 50% Compliant" icon={AlertTriangle} trend="down" />
        <StatCard title="Fully Compliant" value={allData.length - criticalItems.length - atRiskItems.length} subtext="Items > 70% Compliant" icon={CheckCircle2} trend="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
          <h3 className="text-lg font-bold text-neutral-900 mb-6">Compliance Gap Analysis</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#525252' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#525252' }} domain={[0, 100]} />
                <Tooltip cursor={{ fill: '#f5f5f5' }} />
                <Legend />
                <Bar dataKey="policy" name="Policy Readiness" fill="#dc2626" radius={[4, 4, 0, 0]} barSize={50} />
                <Bar dataKey="evidence" name="Evidence Gathering" fill="#6b7280" radius={[4, 4, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col">
          <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Priority Attention
          </h3>
          <div className="flex-1 overflow-y-auto pr-2">
            <div className="space-y-3">
              {[...criticalItems, ...atRiskItems]
                .sort((a, b) => ((a.policy + a.evidence)/2) - ((b.policy + b.evidence)/2))
                .slice(0, 6)
                .map((item) => (
                <div key={item.id} className="p-3 bg-neutral-50 rounded-lg border border-neutral-100 hover:border-neutral-300 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-neutral-500 uppercase">{item.type}</span>
                    <span className="text-xs font-mono text-neutral-400">{item.code.split(' ')[0]}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-neutral-800 line-clamp-1">{item.name}</h4>
                  <div className="mt-2 flex gap-2 text-xs">
                    <span className={`px-2 py-1 rounded bg-white border ${item.policy < 50 ? 'text-red-700 border-red-200' : 'text-neutral-600 border-neutral-200'}`}>Policy: {item.policy}%</span>
                    <span className={`px-2 py-1 rounded bg-white border ${item.evidence < 50 ? 'text-red-700 border-red-200' : 'text-neutral-600 border-neutral-200'}`}>Evid: {item.evidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('summary');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [opsData, setOpsData] = useState(INITIAL_OPERATIONS_DATA);
  const [regData, setRegData] = useState(INITIAL_REGULATIONS_DATA);
  const [clientData] = useState(CLIENTS_DATA); // New static client data
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Pre-loaded Snapshot');
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      // Fetch Ops
      const opsResponse = await fetch(OPS_CSV_URL);
      if (!opsResponse.ok) throw new Error(`Failed to fetch Ops Data: ${opsResponse.status}`);
      const opsText = await opsResponse.text();
      const parsedOps = parseCSV(opsText);
      const mappedOps = parsedOps.map((row, idx) => {
        if (row.length < 5) return null;
        return {
          id: idx + 1,
          type: 'OPERATIONS',
          name: row[2] || 'Unknown',
          code: row[4] || 'UNKNOWN',
          policy: parsePercentage(row[5]),
          evidence: parsePercentage(row[6])
        };
      }).filter(item => item && item.name && item.name !== 'BUSINESS WORKFLOW');
      
      if (mappedOps.length > 0) setOpsData(mappedOps);

      // Fetch Regs
      const regResponse = await fetch(REG_CSV_URL);
      if (!regResponse.ok) throw new Error(`Failed to fetch Reg Data: ${regResponse.status}`);
      const regText = await regResponse.text();
      const parsedReg = parseCSV(regText);
      const mappedReg = parsedReg.map((row, idx) => {
        if (row.length < 5) return null;
        return {
          id: 100 + idx,
          type: 'REGULATION',
          name: row[2] || 'Unknown',
          code: row[4] || 'UNKNOWN',
          policy: parsePercentage(row[5]),
          evidence: parsePercentage(row[6])
        };
      }).filter(item => item && item.name && item.name !== 'REGULATION');

      if (mappedReg.length > 0) setRegData(mappedReg);
      
      setLastUpdated('Live Connected');
    } catch (error) {
      console.error("Data Fetch Error:", error);
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderContent = () => {
    if (errorMsg) {
       return (
         <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-800">
           <AlertTriangle className="w-5 h-5" />
           <div>
             <p className="font-bold">Error Loading Data</p>
             <p className="text-sm">{errorMsg}. Using pre-loaded snapshot.</p>
           </div>
         </div>
       );
    }
    
    switch (activeTab) {
      case 'summary': return <SummaryDashboard opsData={opsData} regData={regData} />;
      case 'operations': return <DashboardTable title="Operational Controls Framework" data={opsData} type="OPERATIONS" />;
      case 'regulations': return <DashboardTable title="Regulatory Compliance Framework" data={regData} type="REGULATION" />;
      case 'clients': return <ClientDashboardTable data={clientData} />;
      default: return <SummaryDashboard opsData={opsData} regData={regData} />;
    }
  };

  const navItems = [
    { id: 'summary', label: 'Executive Summary', icon: PieChart },
    { id: 'operations', label: 'Operational Controls', icon: Settings },
    { id: 'regulations', label: 'Regulatory Framework', icon: FileText },
    { id: 'clients', label: 'Client Monitoring', icon: Users }, // New Tab
  ];

  return (
    <div className="min-h-screen bg-neutral-100 flex text-neutral-900" style={{ fontFamily: '"Century Gothic", Futura, sans-serif' }}>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar - GREY (bg-neutral-800) */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-48 bg-neutral-800 text-white transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-4 border-b border-neutral-700">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 p-1.5 rounded-lg"><ShieldCheck className="w-5 h-5 text-white" /></div>
            <h1 className="font-bold text-sm leading-tight tracking-tight">ZeroCRisk</h1>
          </div>
        </div>
        <nav className="p-2 space-y-1 mt-4">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }} className={`w-full flex items-center justify-between p-2 rounded-lg transition-all duration-200 group ${activeTab === item.id ? 'bg-neutral-700 text-white shadow-lg' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'}`}>
              <div className="flex items-center gap-2">
                <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-red-100' : 'text-neutral-500 group-hover:text-neutral-300'}`} />
                <span className="font-medium text-xs text-left">{item.label}</span>
              </div>
              {activeTab === item.id && <ChevronRight className="w-3 h-3 text-red-200" />}
            </button>
          ))}
        </nav>
        {/* User Profile Section in Sidebar */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-neutral-700 bg-neutral-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-neutral-800 flex items-center justify-center text-xs font-bold border border-neutral-600">
              JD
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-medium text-white truncate">John Doe</div>
              <div className="text-[10px] text-neutral-400 truncate">Compliance Officer</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-neutral-200 h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 text-neutral-500 hover:bg-neutral-100 rounded-lg"><Menu className="w-6 h-6" /></button>
            <h2 className="text-lg font-semibold text-neutral-900 hidden sm:block">{navItems.find(i => i.id === activeTab)?.label}</h2>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={fetchData} className={`p-2 rounded-full hover:bg-neutral-100 text-neutral-500 transition-all ${isLoading ? 'animate-spin' : ''}`} title="Refresh Data"><RefreshCw className="w-4 h-4" /></button>
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${isLoading ? 'bg-neutral-100 text-neutral-500 border-neutral-200' : 'bg-neutral-100 text-neutral-700 border-neutral-200'}`}>
              <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-neutral-400' : 'bg-emerald-500 animate-pulse'}`}></span>
              {isLoading ? 'Syncing...' : 'System Active'}
            </div>
            <div className="text-sm text-neutral-500">Source: <span className="font-mono text-neutral-700">{lastUpdated}</span></div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}