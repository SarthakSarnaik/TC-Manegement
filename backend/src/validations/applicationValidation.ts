import { z } from 'zod';

export const createApplicationSchema = z.object({
  body: z.object({
    studentRollNo: z
      .string({ required_error: 'Student roll number is required' })
      .min(3, 'Roll number must be at least 3 characters')
      .max(20, 'Roll number cannot exceed 20 characters'),
    reasonForLeaving: z.enum(
      [
        'Higher Education',
        'Job / Employment',
        'Relocation / Family Shift',
        'Medical Reasons',
        'Personal / Financial',
        'Course Completed',
      ],
      { required_error: 'Valid reason for leaving is required' }
    ),
    intendedInstitute: z.string().max(255).optional(),
    remarks: z.string().max(1000).optional(),
  }),
});

export const updateApplicationStatusSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'Application ID must be a numeric string'),
  }),
  body: z.object({
    status: z.enum(['Pending', 'Under Review', 'Approved', 'Rejected', 'TC Issued'], {
      required_error: 'Valid application status is required',
    }),
    conduct: z.enum(['Exemplary', 'Good', 'Satisfactory', 'Fair']).optional(),
    reviewedBy: z.string().max(100).optional(),
    approvedBy: z.string().max(100).optional(),
    rejectionReason: z.string().max(1000).optional(),
    duesClearance: z
      .object({
        library: z.boolean().optional(),
        accounts: z.boolean().optional(),
        laboratory: z.boolean().optional(),
        hostel: z.boolean().optional(),
        sports: z.boolean().optional(),
      })
      .optional(),
  }),
});
