import { ComponentStory, ComponentMeta } from '@storybook/react'
import { createColumnHelper, Row } from '@tanstack/react-table'
import { Grid } from './grid'
import '../index.css'
import '../App.css'
import '../assets/style/app.scss'

export default {
    title: 'Components/Grid',
    component: Grid
} as ComponentMeta<typeof Grid>

const Template: ComponentStory<typeof Grid> = args => <Grid {...args} />

export type ExampleData = {
    name: string
    count: number
}

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
    columnHelper.accessor('name', {
        header: 'Name',
        cell: info => info.getValue()
    }),
    columnHelper.accessor('count', {
        header: 'Count',
        cell: info => info.getValue()
    }),
]

export const Test = Template.bind({});
Test.args = {
    columns, 
    data, 
    isLoading: false, 
    isSuccess: true, 
    isError: false 
}
