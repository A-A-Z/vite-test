// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as LoadingBars } from '../assets/images/wilson-bars.svg'

interface ConfirmModalProps {
  label?: string
  size?: 'small' | 'normal' | 'large'
  colour?: 'dark' | 'light' | 'brand'
  inline?: boolean
}
export const Loader = ({ label = '', size = 'normal', colour = 'brand', inline = false }: ConfirmModalProps) => (
  <div className={`loader loader--${size} loader--${colour}${inline ? ' loader--inline' : ''}`} data-testid="loading-component">
      <div className="loader__container">
          <LoadingBars />
          {label !== '' && <h3 className="loader__label">{label}</h3>}
      </div>
  </div>
)
