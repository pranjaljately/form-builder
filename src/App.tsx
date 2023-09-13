import './App.css'
import PayrollEnquiryForm from './forms/PayrollEnquiry/PayrollEnquiryForm'
import data from '../payrollEnquiryForm.json'

function App() {
  return <PayrollEnquiryForm formData={data} />
}

export default App
