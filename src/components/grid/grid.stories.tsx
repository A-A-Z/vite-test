import { ComponentStory, ComponentMeta } from '@storybook/react'
import { createColumnHelper } from '@tanstack/react-table'
import { HeartFilledIcon as Icon } from '@radix-ui/react-icons'
import { Grid } from './grid'
import '../../index.css'
import '../../App.css'
import '../../assets/style/app.scss'
interface ExampleData {
  name: string,
  count: number
}

const columnHelper = createColumnHelper<ExampleData>()

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

const columns = [
  columnHelper.accessor(({ name }) => name as unknown, {
    header: 'Name'
  }),
  columnHelper.accessor(({ count }) => count as unknown, {
    header: 'Count'
  }),
  columnHelper.display({
    id: 'actions',
    cell: () => <Icon />
  })
]

export default {
  title: 'Components/Grid',
  component: Grid
} as ComponentMeta<typeof Grid>

const Template: ComponentStory<typeof Grid> = () => <Grid<ExampleData, unknown> columns={columns} data={data} isLoading={false} isSuccess={true} isError={false} />

export const Test = Template.bind({})
