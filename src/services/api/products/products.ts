import axios from "../../lib/axios";
import type { Products } from "../../types/products";


class ProductsService{
    async create(productsData: Products){
        const { data } = await axios.post("/products", productsData);
        return data;
    }

    async getAll(){
        return await axios.get("/products")
    }
}

export const productsService = new ProductsService();