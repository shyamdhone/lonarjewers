const API_KEY = import.meta.env.VITE_GOLD_API_KEY;

const BASE_URL = "https://www.goldapi.io/api";

const headers = {
  "x-access-token": API_KEY,
  "Content-Type": "application/json",
};

export async function getGoldRate() {
  try {
    const response = await fetch(`${BASE_URL}/XAU/INR`, {
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Gold Rate");
    }

    const data = await response.json();

    return {
      metal: "Gold",
      price: data.price,
      currency: data.currency,
      timestamp: data.timestamp,
      change: data.ch,
      changePercent: data.chp,
    };
  } catch (error) {
    console.error("Gold API Error:", error);
    throw error;
  }
}

export async function getSilverRate() {
  try {
    const response = await fetch(`${BASE_URL}/XAG/INR`, {
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Silver Rate");
    }

    const data = await response.json();

    return {
      metal: "Silver",
      price: data.price,
      currency: data.currency,
      timestamp: data.timestamp,
      change: data.ch,
      changePercent: data.chp,
    };
  } catch (error) {
    console.error("Silver API Error:", error);
    throw error;
  }
}

export async function getMetalRates() {
  try {
    const [gold, silver] = await Promise.all([
      getGoldRate(),
      getSilverRate(),
    ]);

    return {
      gold,
      silver,
      updatedAt: new Date(),
    };
  } catch (error) {
    throw error;
  }
}