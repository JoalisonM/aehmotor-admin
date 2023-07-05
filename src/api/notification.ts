import { api } from "../lib/axios";

const uriArrive = "/notificar_chegada";
const uriDeparture = "/notificar_saida";

export const Notification = {
  arrive() {
    return api.post(uriArrive);
  },

  departure() {
    return api.post(uriDeparture);
  },
};