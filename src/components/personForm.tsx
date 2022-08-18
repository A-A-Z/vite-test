import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Input } from './input'
import { Person } from '../global/types'

type FormValues = {
    firstName: string;
    lastName: string;
}

interface PersonFormProps {
    id: string,
    initData: Person
}

const validationSchema = yup
  .object()
  .shape({
    firstName: yup.string().required('Needs a first name'),
    lastName: yup.string().required('Needs a last name'),
  })
  .required()

export const PersonForm = ({ id }: PersonFormProps) => {
    const methods = useForm<FormValues>({ mode: 'onChange', resolver: yupResolver(validationSchema) })
    const { handleSubmit, formState: { isValid, errors } } = methods
    const onSubmit = handleSubmit(data => console.log(data, isValid, errors))

    return (
      <FormProvider {...methods} >
        <form onSubmit={onSubmit}>
          <Input name="firstName" />
          <Input name="lastName" />
          <button type="submit">Save</button> {isValid ? 'Valid' : 'Invalid'}
        </form>
      </FormProvider>
    )
}
