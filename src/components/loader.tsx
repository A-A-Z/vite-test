// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as LoadingBars } from '../assets/images/wilson-bars.svg'

interface ConfirmModalProps {
  label: string
}
export const Loader = ({ label }: ConfirmModalProps) => (
  <div className="loader" data-testid="loading-component">
      <div className="loader__container">
          <LoadingBars />
          <h3 className="loader__label">{label}</h3>
      </div>
  </div>
)
