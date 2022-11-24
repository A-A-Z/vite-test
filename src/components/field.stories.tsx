import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useForm, FormProvider } from 'react-hook-form'
import Field from './field'
import '../assets/style/app.scss'

export default {
  title: 'Components/Field',
  component: Field
} as ComponentMeta<typeof Field>

type FormValues = {
  test: string
}

const Template: ComponentStory<typeof Field> = args => {
  const methods = useForm<FormValues>({ mode: 'onBlur' })
  return (
    <FormProvider {...methods}>
      <Field {...args} />
    </FormProvider>
  )
}

export const Text = Template.bind({})
Text.args = {
  id: 'test',
  name: 'test',
  label: 'Example Text Field'
}

export const Select = Template.bind({})
Select.args = {
  id: 'test',
  name: 'test',
  label: 'Example Select Field',
  type: 'select',
  options: [
    { id: 'One', name: 'One' },
    { id: 'Two', name: 'Two' },
    { id: 'Three', name: 'Three' }
  ]
}
