import { createContext } from "use-context-selector";

interface NotificationContextData {
  notifyArrive: () => void;
  notifyDeparture: () => void;
}

const NotificationContext = createContext<NotificationContextData>({} as NotificationContextData);

export default NotificationContext;
