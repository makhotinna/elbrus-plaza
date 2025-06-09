/**
  @param month 
  @param year 
  @returns 
 */
export const generateDays = (month: number, year: number): (Date | null)[] => {
    const firstDay = new Date(year, month, 1); 
    const lastDay = new Date(year, month + 1, 0); 
    const daysInMonth = lastDay.getDate(); 
    const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; 

    const days: (Date | null)[] = [];
    
    for (let i = 0; i < startingDay; i++) {
        days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(year, month, i));
    }

    return days;
};