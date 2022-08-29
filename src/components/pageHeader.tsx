
export interface PageHeaderProps {
    title: string
}

export const PageHeader = ({ title }: PageHeaderProps) => (
    <header><h1>Title: {title}</h1></header>
)
