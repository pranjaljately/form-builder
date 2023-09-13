import { z } from 'zod'

const responseOption = z.object({
  id: z.string(),
  label: z.string(),
})

const fieldValidation = z.object({
  required: z.boolean(),
  requiredMessage: z.string().optional(),
})

const fieldValidationWithRequiredIf = z.object({
  requiredIf: z.record(z.array(z.string())),
  requiredMessage: z.string(),
})

const field = z.object({
  id: z.string(),
  label: z.string(),
  name: z.string(),
  type: z.string(),
  responseOptions: z.array(responseOption).optional(),
  validation: z.union([fieldValidation, fieldValidationWithRequiredIf]),
})

const payrollEnquiryFormSchema = z.object({
  title: z.string(),
  version: z.string(),
  subtitle: z.string(),
  fields: z.array(field),
})

export type PayrollEnquiryForm = z.infer<typeof payrollEnquiryFormSchema>
