
function Card({children, className, display}) {
  return (
    <div className={`card ${className}`} style={{display: `${display}`}}>
      {children}
    </div>
  )
}

Card.defaultProps = {
  displayType: ''
}

export default Card