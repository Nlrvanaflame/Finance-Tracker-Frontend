import { formStyle } from '../styles/RecordManagementStyles/FormStyle'
import { Record, RecordType } from '../types/FinancialRecordType'
import { ModalProps } from '../types/ModalType'
import { Formik, Form, Field } from 'formik'

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, record, handleEditRecord }) => {
  if (!isOpen || !record) return null

  const modalStyle: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    backgroundColor: '#5a678a',
    padding: '40px',
    borderRadius: '8px',
    width: '500px', // Adjust the width as needed
    color: 'black' // Text color
  }

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000
  }

  const fieldStyle = {
    marginBottom: '20px',
    padding: '10px',
    borderRadius: '4px',
    width: '100%'
  }

  return (
    <>
      <div style={overlayStyle} onClick={onClose}></div>
      <div style={modalStyle}>
        <h2 style={{ marginBottom: '20px' }}>Edit Record</h2>
        <Formik
          initialValues={record}
          onSubmit={(values, { resetForm }) => {
            handleEditRecord(record.id, values, resetForm)
            onClose()
          }}
        >
          {() => (
            <Form>
              <div style={fieldStyle}>
                <label>Type</label>
                <Field as="select" name="type" style={{ width: '100%', padding: '5px' }}>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </Field>
              </div>

              <div style={fieldStyle}>
                <label>Amount</label>
                <Field name="amount" type="number" style={{ width: '100%', padding: '5px' }} />
              </div>

              <div style={fieldStyle}>
                <label>Description</label>
                <Field name="description" type="text" style={{ width: '100%', padding: '5px' }} />
              </div>

              <button
                type="submit"
                style={{
                  padding: '10px 20px',
                  borderRadius: '5px',
                  border: 'none',
                  color: '#fff',
                  backgroundColor: '#405a94'
                }}
              >
                Save Changes
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default Modal
