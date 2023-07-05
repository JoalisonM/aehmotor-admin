import { useState, useCallback, ReactNode, useEffect } from "react";
import { useContextSelector } from "use-context-selector";

import NotificationContext from "./context";
import { useNotifications } from "../../hooks/useNotifications";

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const { loading, arrive, departure } = useNotifications();

  const notifyArrive = useCallback(async () => {
    await arrive();
  }, []);

  const notifyDeparture = useCallback(async () => {
    await departure();
  }, []);

   return (
    <NotificationContext.Provider
      value={{
        notifyArrive,
        notifyDeparture,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export function useNotify() {
  const notifyArrive = useContextSelector(NotificationContext, (auth) => auth.notifyArrive);
  const notifyDeparture = useContextSelector(NotificationContext, (auth) => auth.notifyDeparture);

  return {
    notifyArrive,
    notifyDeparture,
  };
}