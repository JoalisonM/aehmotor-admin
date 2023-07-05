import { useState } from "react";

import { Notification } from "../api/notification";

export const useNotifications = () => {
  const [loading, setLoading] = useState(false);

  console.log(loading);

  const arrive = async () => {
    try {
      setLoading(true);
      const response = await Notification.arrive();

      return response.data;
    } finally {
      setLoading(false);
    }
  };

  const departure = async () => {
    try {
      setLoading(true);
      const response = await Notification.departure();

      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return {
    arrive,
    loading,
    departure,
  };
};