import { AnimatePresence } from "framer-motion"
import { IoMdStar, IoIosStarOutline } from "react-icons/io";
import { MdOutlineFormatQuote } from "react-icons/md";

export default function() {
  return (
    <div className="min-h-screen flex-col max-md:flex gap-10 px-6 py-10">
      <AnimatePresence>
        <h1 className="font-semibold text-3xl mt-5 mb-16 text-center">O que dizem nossos Clientes</h1>
   
        <div
        className="flex gap-6 items-center justify-center max-md:flex-col">
            
        <div
        data-aos="fade-up-right"
        data-aos-duration="1500"
        className="flex-col gap-6 items-center justify-start p-6 bg-[#782143]">
          <div className="flex gap-4 items-center">
            <img className="h-12 w-12 rounded-r-full" src="https://media.istockphoto.com/id/1486856046/vector/young-asian-woman-in-eyeglasses.jpg?s=612x612&w=0&k=20&c=ODiwWGFoAarv25jztH3W2m00P6cT72Md6T204Yb9dn0=" alt="avatar4" title="avatar4" />
            <h6 className="font-semibold text-white">Sra. Dadi</h6>
            <div className="flex text-white/80"><IoMdStar /><IoMdStar /><IoMdStar /><IoMdStar /><IoIosStarOutline /></div>
          </div>
          <div className="max-w-xl p-3 text-white">
            <MdOutlineFormatQuote size={30} className="inline-block mb-2" />
            <p className="italic">"A DinaFashion é a melhor loja de vendas que já conheci! Lá tem de tudo um pouco. A qualidade dos produtos é excepcional, e o atendimento ao cliente é sempre amigável e eficiente. Recomendo a todos!"</p>
          </div>
        </div>

        <div
        data-aos="fade-up-left" 
        data-aos-duration="1300"
        className="flex-col gap-6 items-center justify-start p-6 bg-black/80">
         <div className="flex gap-4 items-center">
            <img className="h-12 w-12 rounded-r-full" src="https://media.istockphoto.com/id/1209837947/vector/portrait-of-a-young-african-girl-with-black-hair-vector-flat-illustration-on-a-transparent.jpg?s=612x612&w=0&k=20&c=5GG4py3debV_ALJY9DvUeZxEofUaec3jmFWMT2Kb9rg=" alt="avatar4" title="avatar4" />
            <h6 className="font-semibold text-white">Teresa Chilingó</h6>
            <div className="flex text-white/80"><IoMdStar /><IoMdStar /><IoMdStar /><IoMdStar /><IoMdStar /></div>
          </div>
          <div className="max-w-xl p-3 text-white">
            <MdOutlineFormatQuote size={30} className="inline-block mb-2" />
            <p className="italic">"A DinaFashion é a melhor loja de roupas que já conheci! A qualidade dos produtos é excepcional, e o atendimento ao cliente é sempre amigável e eficiente. Recomendo a todos!"</p>
          </div>
        </div>
        </div>

      </AnimatePresence>
    </div>
  )
}