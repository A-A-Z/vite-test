import { ComponentStory, ComponentMeta } from '@storybook/react'
import { createColumnHelper, Row } from '@tanstack/react-table'
import { Grid } from './grid'
import '../index.css'
import '../App.css'
import '../assets/style/app.scss'

export type ExampleData = {
    name: string
    count: number
  }

export default {
  title: 'Components/Grid',
  component: Grid
} as ComponentMeta<typeof Grid>

const Template: ComponentStory<typeof Grid> = args => <Grid<ExampleData, unknown> {...args} />

const data: ExampleData[] = [
  {
    name: 'Name1',
    count: 1
  },
  {
    name: 'Name2',
    count: 2
  },
  {
    name: 'Name3',
    count: 3
  }
]

const columnHelper = createColumnHelper<ExampleData>()

const columns = [
  // columnHelper.accessor(({ name }) => name as unknown, {
  //   header: 'Name'
  // })//,
//   columnHelper.accessor('name', {
//     header: 'Name'
//   }),
//   columnHelper.accessor('count', {
//     header: 'Count'
//   })
  {
    accessorKey: 'name' as unknown,
    header: 'Name'
  },
  {
    accessorKey: 'count' as unknown,
    header: 'Count'
  }
]

export const Test = Template.bind({})
Test.args = {
  columns,
  data,
  isLoading: false,
  isSuccess: true,
  isError: false
}
