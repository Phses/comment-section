import PropTypes from 'prop-types'

function SubmitBtn({children, type, isDisabled, version}) {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>{children}</button>
  )
}

SubmitBtn.defaultProps = {
  type: 'submit',
  isDisabled: false,
  version: 'primary'
}
SubmitBtn.prototypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
  version: PropTypes.string
}
export default SubmitBtn