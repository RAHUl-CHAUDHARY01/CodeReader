import Notes from './Notes';
import '../App.css'

 const Home = (props) => {
const {showAlert}=props
    return (
        <div className='front_page'> 
            <Notes showAlert={showAlert}/>
        </div>
    )
}
export default Home
