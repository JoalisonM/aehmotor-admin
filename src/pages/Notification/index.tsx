import { useNotify } from "../../contexts/notification";
import { Card, Button, HomeContainer, CardContainer } from "./styles";

export const Notification = () => {
  const { notifyArrive, notifyDeparture } = useNotify();

  const handleNotifyArrival = () => {
    notifyArrive();
  };

  const handleNotifyDeparture = () => {
    notifyDeparture();
  };

  return (
    <HomeContainer>
      <h1>Notificar Estudantes</h1>

      <CardContainer>
        <Card onSubmit={handleNotifyArrival}>
          <h2>Notificação de chegada</h2>
          <Button
            type="submit"
            variant="blue"
          >
            Notificar
          </Button>
        </Card>

        <Card onSubmit={handleNotifyDeparture}>
          <h2>Notificação de saída</h2>
          <Button
            type="submit"
            variant="blue"
          >
            Notificar
          </Button>
        </Card>
      </CardContainer>
    </HomeContainer>
  );
};