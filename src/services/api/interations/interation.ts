import axios from "../../lib/axios";
import type { Interation } from "../../types/interation";


class InteractionsService{
    async create(interationData: Interation){
        const { data } = await axios.post("/interacao", interationData);
        return data;
    }

    async getAll(){
        return await axios.get("/interacao")
    }
}

export const interactionsService = new InteractionsService();