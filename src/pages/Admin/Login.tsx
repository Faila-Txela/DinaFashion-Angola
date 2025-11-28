import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import axios from "../../services/lib/axios";
import Input from "../../components/Input";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const isEmailValid = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const Enter = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !senha) {
      toast.error("Preencha todos os campos.");
      return;
    }

    if (!isEmailValid(email)) {
      toast.error("Email inválido. Tente novamente.");
      return;
    }

    if (senha.length < 6) {
      toast.error("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/login", { email, senha });
      const { status, data } = response;

      if (status === 200) {
        toast.success("Login feito com sucesso!");
        const token = data.token;
        const userData = data.user;
        login(token, userData);
        setTimeout(() => navigate("/painel/dashboard"), 1500);

      } else {
        toast.error("Erro ao fazer login.");
      }
    } catch (error: any) {
      console.error("❌ Erro no servidor ao tentar fazer login:", error);
      toast.error("Erro no servidor ao tentar fazer login.");

      if (error.response?.status === 401) {
        toast.error("Credenciais inválidas. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-8 rounded-2xl shadow-lg w-80 flex flex-col items-center"
        >
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Painel Login
          </h1>
          

          <form onSubmit={Enter} className="w-full flex flex-col gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Email
              </label>
              <Input
                id="email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                title="email"
                placeholder="admin@example.com"
                addClassName="text-gray-700 focus:ring-1 focus:ring-[#ba5511]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Senha
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  title="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="******"
                  addClassName="text-gray-700 focus:ring-1 focus:ring-[#ba5511] pr-10" // Adicionado pr-10 para dar espaço ao ícone
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 cursor-pointer flex items-center text-gray-400 hover:text-[#b95411] transition-colors"
                  aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.97 }}
              className={`mt-4 flex cursor-pointer justify-center items-center gap-2 bg-[#b95411] hover:bg-[#99460e] text-white font-bold py-2 rounded-lg transition ${
                loading ? "opacity-80 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 1,
                  }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                "Entrar"
              )}
            </motion.button>

            <div className="flex items-center">
              <Link
                to="/sig-in"
                className="text-xs text-[#b95411] hover:text-[#99460e]"
              >
                Cadastrar Admin
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default Login;