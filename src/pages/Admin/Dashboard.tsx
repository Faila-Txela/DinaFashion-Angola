import { useEffect, useState } from "react";
import axios from "../../services/lib/axios";
import { clientsService } from "../../services/api/clients/clients";
import { interactionsService } from "../../services/api/interations/interation";
import { productsService } from "../../services/api/products/products";
import { adminService } from "../../services/api/userAdmins/userAdmin";
import { Users, Package, Shield, Activity, Loader2 } from "lucide-react";

type StatusType = "NOVO_LEAD" | "VENDA_FEITA" | "PERDIDO";

interface Interacao {
  id: string;
  cliente: { nome: string; email: string };
  produto: { name: string };
  dataInteration: string;
  status: StatusType;
}

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [interacoes, setInteracoes] = useState<Interacao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clientsService.getAll().then((res) => setClients(res.data));
    productsService.getAll().then((res) => setProducts(res.data));
    adminService.getAll().then((res) => setAdmins(res.data));

    loadData().finally(() => setLoading(false));

    async function loadData() {
      const interationsData = await interactionsService.getAll();
      setInteracoes(interationsData.data);
    }
  }, []);

  const handleStatusChange = async (id: string, novoStatus: StatusType) => {
    await axios.put(`/api/interacao/:${id}`, { status: novoStatus });
    setInteracoes((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: novoStatus } : i))
    );
  };
  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Carregando dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard de Vendas e Clientes
      </h1>

      {/* Cards Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <DashboardCard
          title="Clientes"
          value={clients.length}
          icon={Users}
        />
        <DashboardCard
          title="Produtos"
          value={products.length}
          icon={Package}
        />
        <DashboardCard
          title="Admins"
          value={admins.length}
          icon={Shield}
        />
        <DashboardCard
          title="Interações"
          value={interacoes.length}
          icon={Activity}
        />
      </div>

      {/* Tabela de Interações */}
      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Interações Recentes</h2>
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Cliente</th>
              <th className="p-2">Produto</th>
              <th className="p-2">Status</th>
              <th className="p-2">Data</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {interacoes.map((i) => (
              <tr key={i.id} className="border-t hover:bg-gray-50">
                <td className="p-2">{i.cliente.nome}</td>
                <td className="p-2">{i.produto.name}</td>
                <td className="p-2">{i.status}</td>
                <td className="p-2">
                  {new Date(i.dataInteration).toLocaleString()}
                </td>
                <td className="p-2">
                  <select
                    title="status"
                    value={i.status}
                    onChange={(e) =>
                      handleStatusChange(i.id, e.target.value as StatusType)
                    }
                    className="border p-1 rounded"
                  >
                    <option value="NOVO_LEAD">Novo Lead</option>
                    <option value="VENDA_FEITA">Venda Feita</option>
                    <option value="PERDIDO">Perdido</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import type { LucideIcon } from "lucide-react";

type DashboardCardProps = {
  title: string;
  value: number;
  icon: LucideIcon;
};

function DashboardCard({ title, value, icon: Icon }: DashboardCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl text-[#b95411] shadow hover:shadow-md transition flex items-center justify-between gap-4">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold ">{value}</h3>
      </div>

      <div className="p-3 rounded-full bg-green-50">
        <Icon className="w-8 h-8" strokeWidth={1.75} />
      </div>
    </div>
  );
}