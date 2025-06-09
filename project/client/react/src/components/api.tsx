// api.ts
export const createTempBooking = async (dates: any) => {
  const response = await fetch('https://26.118.5.15:8787/api/bookings/temp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dates),
  });
  return response.json();
};

export const updateTempBooking = async (id: string, data: any) => {
  const response = await fetch(`https://26.118.5.15:8787/api/bookings/temp/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getTempBooking = async (id: string) => {
  const response = await fetch(`https://26.118.5.15:8787/api/bookings/temp/${id}`);
  return response.json();
};