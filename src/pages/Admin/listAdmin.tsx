import { useEffect, useState } from "react";
import { adminService } from "../../services/api/userAdmins/userAdmin";
import { UserCog, Mail, ShieldCheck, Loader2, Search } from "lucide-react";

type Admin = {
  id: string;
  nome: string;
  email: string;
};

export default function AdminList() {
  const [admin, setAdmin] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const data = await adminService.getAll();
        setAdmin(data.data);
      } catch (error) {
        console.error("Erro ao carregar admins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const filteredAdmins = admin.filter((a) => {
    const query = search.toLowerCase();
    return (
      a.nome.toLowerCase().includes(query) ||
      a.email.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Carregando admin's...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-[300px] rounded-2xl">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-100/70">
            <ShieldCheck className="w-5 h-5 text-blue-800" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Admin's do Sistema
            </h2>
            <p className="text-sm text-gray-500">
              Gestão de usuários com privilégios administrativos
            </p>
          </div>
        </div>

        {/* Busca */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 bg-white"
          />
        </div>
      </div>

      {filteredAdmins.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500 bg-white rounded-2xl border border-dashed border-gray-300">
          <UserCog className="w-10 h-10 mb-3 text-gray-300" />
          {admin.length === 0 ? (
            <>
              <p className="font-medium text-gray-700">
                Nenhum admin encontrado.
              </p>
              <p className="text-sm">
                Adicione os primeiros administradores para começar a gestão.
              </p>
            </>
          ) : (
            <>
              <p className="font-medium text-gray-700">
                Nenhum admin corresponde à busca.
              </p>
              <p className="text-sm">
                Tente outro nome ou email, ou limpe o filtro.
              </p>
            </>
          )}
        </div>
      ) : (
        <ul className="space-y-3">
          {filteredAdmins.map((admin) => (
            <li
              key={admin.id}
              className="flex items-center justify-between gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-semibold text-blue-800">
                  {admin.nome
                    .split(" ")
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-800">
                      {admin.nome}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-[2px] rounded-full text-[11px] font-medium bg-emerald-50 text-blue-400">
                      <ShieldCheck className="w-3 h-3" />
                      Admin
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Mail className="w-3 h-3" />
                    <span>{admin.email}</span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400">
                <UserCog className="w-4 h-4" />
                <span>Gestão</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}