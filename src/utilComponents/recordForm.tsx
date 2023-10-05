import { Formik, Form, Field } from 'formik'
import { formStyle } from '../styles/RecordManagementStyles/FormStyle'
import { RecordFormProps } from '../types/RecordFormType'

const RecordForm: React.FC<RecordFormProps> = ({ initialValues, onSubmit, isEditMode }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSubmit(values, resetForm, initialValues.id)
        setSubmitting(false)
      }}
    >
      {({ isSubmitting }) => (
        <Form style={formStyle}>
          <h2 style={{ color: 'white' }}>Add New Record</h2>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '10px', color: 'white' }}>Type: </label>
            <Field as="select" name="type" style={{ padding: '5px', color: '#35455D' }}>
              <option value="" label="Select type" />
              <option value="income" label="Income" />
              <option value="expense" label="Expense" />
            </Field>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '10px', color: 'white' }}>Amount: </label>
            <Field name="amount" type="number" style={{ padding: '5px', color: '#35455D' }} />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '10px', color: 'white' }}>Description: </label>
            <Field name="description" type="text" style={{ padding: '5px', color: '#35455D' }} />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '10px 20px',
              borderRadius: '5px',
              border: 'none',
              color: '#fff',
              backgroundColor: '#405a94'
            }}
          >
            {isEditMode ? 'Edit Record' : 'Add Record'}
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default RecordForm
