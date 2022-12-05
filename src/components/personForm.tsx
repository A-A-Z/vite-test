import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Field from './field'
import { SubmitBtn } from './submitBtn'
import { Person, PersonFormData } from '../global/types'
import { STATE_OPTIONS, GENDER_OPTIONS } from '../global/constants'
import { Icon } from './icon'
import { useEditPersonMutation } from '../features/api/apiSlice'

interface PersonFormProps {
    initData: Person
}

const validationSchema = yup
  .object()
  .shape({
    firstName: yup.string().required('Needs a first name').max(64, 'Max 64 characters'),
    lastName: yup.string().required('Needs a last name').max(64, 'Max 64 characters'),
    email: yup.string().required('Email is required').email('Must be a valid email address').max(128, 'Max 128 characters')
  })
  .required()

export const PersonForm = ({ initData }: PersonFormProps) => {
  const [editPerson] = useEditPersonMutation()
  const methods = useForm<PersonFormData>({
    mode: 'onBlur',
    defaultValues: {
      firstName: initData.name.first,
      lastName: initData.name.last,
      email: initData.email,
      state: initData.location.state,
      gender: initData.gender
    },
    resolver: yupResolver(validationSchema)
  })
  const { handleSubmit, formState: { isValid } } = methods
  const onSubmit = handleSubmit(async formData => {
    if (isValid) {
      await editPerson(formData)
    }
  })

  return (
    <FormProvider {...methods}>
      <form className="form" onSubmit={onSubmit}>
        <Field id="firstName" name="firstName" label="First Name"/>
        <Field id="lastName" name="lastName" label="Last Name" />
        <Field id="email" name="email" label="Email" />
        <Field id="state" name="state" label="State" type="select" options={STATE_OPTIONS} />
        <Field id="gender" name="gender" label="Gender" type="radio" options={GENDER_OPTIONS} />
        <SubmitBtn submittingTxt="Saving"><Icon icon={'Pencil2Icon'}>Save</Icon></SubmitBtn>
      </form>
    </FormProvider>
  )
}
