import { useForm } from 'react-hook-form'
import { PayrollEnquiryForm } from './schema'
import SubmitButton from '../../components/Form/SubmitButton'

type PayrollEnquiryFormProps = {
  formData: PayrollEnquiryForm
}
const PayrollEnquiryForm = ({ formData }: PayrollEnquiryFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
    watch,
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = data => {
    // Construct the email body as an HTML string
    const emailBody = `
      <html>
        <body>
        <p>Thanks, we hav received your enquiry.</p>
        <p>A member of the team will review this and get back to you soon.</p>
        <p>Here's a quick summary of what we've received:</p>
          <p>Query Type: ${data.queryType}</p>
          <p>Query: ${data.query}</p>
          ${
            data.payslipDate
              ? `<p>Date of Payslip: ${data.payslipDate}</p>`
              : ''
          }
        </body>
      </html>
    `

    console.log(emailBody)
  }

  /**
   * Checks if the field should be required based on the form values
   * and the `requiredIf` fields and values.
   */
  const checkRequiredDependantFields = (
    requiredIfFields: Record<string, string[]>
  ) => {
    const required = Object.keys(requiredIfFields).some(key => {
      const currentVal = watch(key)
      return requiredIfFields[key]?.includes(currentVal)
    })

    return required
  }

  const renderFormControl = field => {
    const required =
      field.validation.required ??
      checkRequiredDependantFields(field.validation.requiredIf)

    const fieldId = field.id
    const fieldName = field.name
    const fieldLabel = field.label
    const fieldErrors = errors[fieldName]

    /**
     * With more time, I would've liked to create a reusable component
     * for each of switch-case statements below.
     */
    switch (field.type) {
      case 'date':
        return (
          <div key={fieldId}>
            <label htmlFor={fieldName}>{fieldLabel}</label>
            <input
              type={field.type}
              {...register(fieldName, {
                required,
              })}
              id={fieldName}
              aria-invalid={fieldErrors ? 'true' : 'false'}
            />
            {fieldErrors && fieldErrors.type === 'required' && (
              <span role='alert'>{field.validation.requiredMessage}</span>
            )}
          </div>
        )
      case 'textarea':
        return (
          <div key={fieldId}>
            <label htmlFor={fieldName}>{fieldLabel}</label>
            <textarea
              {...register(fieldName, {
                required,
              })}
              rows={10}
              id={fieldName}
              aria-invalid={fieldErrors ? 'true' : 'false'}
            />
            {fieldErrors && fieldErrors.type === 'required' && (
              <span role='alert'>{field.validation.requiredMessage}</span>
            )}
          </div>
        )
      case 'select':
        return (
          <div key={fieldId}>
            <label htmlFor={fieldName}>{fieldLabel}</label>
            <select
              {...register(fieldName, {
                required,
              })}
              defaultValue={''}
              id={fieldName}
              aria-invalid={fieldErrors ? 'true' : 'false'}
            >
              <option disabled value='' style={{ display: 'none' }} />
              {field.responseOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            {fieldErrors && fieldErrors.type === 'required' && (
              <span role='alert'>{field.validation.requiredMessage}</span>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      <h1>{formData.title}</h1>
      <h2>{formData.subtitle}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formData.fields.map(field => renderFormControl(field))}
        <SubmitButton disabled={!isDirty || !isValid} label='Submit' />
      </form>
    </>
  )
}

export default PayrollEnquiryForm
