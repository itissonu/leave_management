import { z, object, string, date } from 'zod';

// Define Zod schema for form validation
export const leaveRequestSchema = object({
    leaveType: string().min(1, { message: 'Leave type is required' }),
    startDate: string().min(1, { message: 'Leave type is required' }),
    endDate:string().min(1, { message: 'Leave type is required' }),
    reason: string().min(1, { message: 'Reason is required' }),
  });