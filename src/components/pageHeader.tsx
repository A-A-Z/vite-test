
export interface PageHeaderProps {
    title: string
}

export const PageHeader = ({ title }: PageHeaderProps) => (
    <header className="page-header"><h1 className="page-header__title">Title: {title}</h1></header>
)
