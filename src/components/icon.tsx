import * as Icons from '@radix-ui/react-icons'

// https://icons.radix-ui.com/

export type IconKey = keyof typeof Icons

export interface IconProps {
  icon?: IconKey
  children?: React.ReactNode | string
}

export const Icon = ({ icon, children }: IconProps) => {
  if (icon === undefined) {
    return <>{children}</> || null
  }

  const IconElem = Icons[icon]

  return children === undefined
    ? <IconElem className="icon" width="16" height="16" />
    : <><IconElem className="icon icon--with-text" width="16" height="16" /><span>{children}</span></>
}
