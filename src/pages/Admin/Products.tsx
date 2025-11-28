import { useState } from "react";
import { productsService } from "../../services/api/products/products"



function Products() {
  const [loading, setLoading] = useState(true);
  
  if (loading) return <p className="p-4">Carregando Produtos...</p>;

  return (
    <div>Products</div>
  )
}

export default Products

// -- Continua... --