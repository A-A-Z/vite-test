import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Field from './field'
import { Person } from '../global/types'
import { stateOptions } from '../global/constants'

type FormValues = {
    firstName: string
    lastName: string
    email: string
    state: string
}

interface PersonFormProps {
    initData: Person
}

const validationSchema = yup
  .object()
  .shape({
    firstName: yup.string().required('Needs a first name').max(64, 'Max 64 characters'),
    lastName: yup.string().required('Needs a last name').max(64, 'Max 64 characters'),
    email: yup.string().required('Email is required').email('Must be a valid email address').max(128, 'Max 128 characters'),
  })
  .required()

export const PersonForm = ({ initData }: PersonFormProps) => {
    const methods = useForm<FormValues>({ 
      mode: 'onBlur', 
      defaultValues: {
        firstName: initData.name.first,
        lastName: initData.name.last,
        email: initData.email,
        state: initData.location.state
      },
      resolver: yupResolver(validationSchema) 
    })
    const { handleSubmit, formState: { isValid } } = methods
    const onSubmit = handleSubmit(data => console.log(data, isValid))

    return (
      <FormProvider {...methods}>
        <form className="form" onSubmit={onSubmit}>
          <Field id="firstName" name="firstName" label="First Name"/>
          <Field id="lastName" name="lastName" label="Last Name" />
          <Field id="email" name="email" label="Email" />
          <Field id="state" name="state" label="State" type="select" options={stateOptions} />
          <button type="submit">Save</button> {isValid ? 'Valid' : 'Invalid'}
        </form>
      </FormProvider>
    )
}
