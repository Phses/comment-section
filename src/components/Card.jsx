import PropTypes from 'prop-types'


function Card({children, className, display}) {
  return (
    <div className={`card ${className}`} style={{display: `${display}`}}>
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  display: PropTypes.string,
}

Card.defaultProps = {
  displayType: ''
}

export default Card