
import Home from './Home'

const Front = (props) => {
  const {showAlert}=props
  return (
    <div>
      <Home showAlert={showAlert}/>
    </div>
  )
}

export default Front
