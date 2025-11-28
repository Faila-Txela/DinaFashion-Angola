import { useEffect, useState } from "react";
import { clientsService } from "../../services/api/clients/clients";
import { Loader2 } from "lucide-react";

type Client = {
  id: string;
  nome: string;
  email: string;
  phone?: string;
}

export default function ClientsList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await clientsService.getAll();
        setClients(data.data);
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Carregando clientes...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Clientes</h2>

      {clients.length === 0 ? (
        <p>Nenhum cliente encontrado.</p>
      ) : (
        <ul className="space-y-3">
          {clients.map((client) => (
            <li
              key={client.id}
              className="p-4 border rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <p><strong>Nome:</strong> {client.nome}</p>
              <p><strong>Email:</strong> {client.email}</p>
              {client.phone && <p><strong>Telefone:</strong> {client.phone}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
