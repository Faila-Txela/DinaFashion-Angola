import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { FaExpand, FaShareAlt } from 'react-icons/fa'; 
import Categories from './Categories';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Bar from '../components/Bar';


// DADOS DE EXEMPLO
const produtos = [

    { id: 1, titulo: "Terno Casual Slim", descricao: "Perfeito para eventos formais e semi-formais.", preco: "55.000", img: "https://cdn.pixabay.com/photo/2017/01/14/10/03/fashion-1979136_1280.jpg", url: "/produto/2" },

    { id: 2, titulo: "Brincos de Diamante", descricao: "Acabamento em ouro branco 18k.", preco: "120.000", img: "https://cdn.pixabay.com/photo/2023/04/26/08/38/jewelry-7951905_1280.jpg", url: "/produto/3" },

    { id: 3, titulo: "Vestido Floral Luxo", descricao: "Um vestido leve e elegante para a estação.", preco: "25.000", img: "https://cdn.pixabay.com/photo/2016/11/22/19/08/hangers-1850082_1280.jpg", url: "/produto/1" },

    { id: 4, titulo: "Terno Casual Slim", descricao: "Perfeito para eventos formais e semi-formais.", preco: "55.000", img: "https://cdn.pixabay.com/photo/2017/01/14/10/03/fashion-1979136_1280.jpg", url: "/produto/2" },

    { id: 5, titulo: "Brincos de Diamante", descricao: "Acabamento em ouro branco 18k.", preco: "120.000", img: "https://cdn.pixabay.com/photo/2023/04/26/08/38/jewelry-7951905_1280.jpg", url: "/produto/3" },

    { id: 6, titulo: "Vestido Floral Luxo", descricao: "Um vestido leve e elegante para a estação.", preco: "25.000", img: "https://cdn.pixabay.com/photo/2016/11/22/19/08/hangers-1850082_1280.jpg", url: "/produto/1" },

    { id: 7, titulo: "Terno Casual Slim", descricao: "Perfeito para eventos formais e semi-formais.", preco: "55.000", img: "https://cdn.pixabay.com/photo/2017/01/14/10/03/fashion-1979136_1280.jpg", url: "/produto/2" },

    { id: 8, titulo: "Brincos de Diamante", descricao: "Acabamento em ouro branco 18k.", preco: "120.000", img: "https://cdn.pixabay.com/photo/2023/04/26/08/38/jewelry-7951905_1280.jpg", url: "/produto/3" },

];


function Masculine() {

    return (

        <AnimatePresence>

            <Header />

            <div className='flex flex-col min-h-screen bg-white p-4 gap-8 pt-28'>

                {/* --- Container Principal: Sidebar + Produtos --- */}
                <div className='flex gap-6 w-full min-h-90'>

                      <div className="relative">
                        <Bar />
                      </div>

                    {/* Conteúdo dos Produtos */}
                    <motion.div
                        className='flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    > 

                        {produtos.map((produto) => (

                            <Link 
                                to={produto.url} 
                                key={produto.id} 
                                className="relative group w-full overflow-hidden bg-gray-50 rounded-lg hover:shadow-xl transition-shadow duration-300"
                            >

                                {/* Imagem do Produto */}
                                <div className='relative overflow-hidden h-72 w-full'>

                                    <motion.img
                                        src={produto.img}
                                        alt={produto.titulo}
                                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                                    />

                                    {/* Opções em Grid ao passar o mouse (Hover Overlay) */}
                                    <div className='absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4'>

                                        <button 
                                         type="button" 
                                         className='bg-white/80 p-3 rounded-full text-gray-800 hover:bg-white transition-colors' 
                                         title="Expandir">
                                            <FaExpand size={20} />
                                        </button>

                                        <button 
                                         type="button" 
                                         className='bg-white/80 p-3 rounded-full text-gray-800 hover:bg-white transition-colors' 
                                         title="Compartilhar">
                                            <FaShareAlt size={20} />
                                        </button>

                                    </div>

                                </div>

                                {/* Informações do Produto (Abaixo da Imagem) */}
                                <div className='p-3 flex flex-col'>

                                    <h3 className='font-semibold text-gray-900 truncate'>{produto.titulo}</h3>
                                    <p className='text-sm text-gray-600 truncate'>{produto.descricao}</p>
                                    <p className='mt-2 font-bold text-lg text-[#ba5511]'>{produto.preco} kz</p>

                                </div>

                            </Link>

                        ))}

                    </motion.div>

                </div>

                {/* --- Outras Categorias --- */}
                <div className='w-full mt-8 flex-1'>
                    <Categories />
                </div>

            </div>

            <Footer />

        </AnimatePresence>

    );

}

export default Masculine;