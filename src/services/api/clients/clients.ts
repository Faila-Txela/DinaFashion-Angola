import axios from "../../lib/axios";
import type { Clients } from "../../types/clients";


class ClientsService{
    async create(clientsData: Clients){
        const { data } = await axios.post("/clients", clientsData);
        return data;
    }

    async getAll(){
        return await axios.get("/clients")
    }
}

export const clientsService = new ClientsService();