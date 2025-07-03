/**
 * 🕉️ Payment Interfaces
 * "अर्थ धर्म काम मोक्ष" - "Wealth, righteousness, desire, liberation"
 */

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  [key: string]: any;
}
