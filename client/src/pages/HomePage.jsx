import { useDispatch, useSelector } from 'react-redux'
import { saveDataUser } from '../store/userSlice';
import { Link } from 'react-router-dom';
function Home() {
    const user = useSelector(state => state.user.value)
    const dispatch = useDispatch()

    const newValue = {
        email: "ngocafhaksd",
        password: "fasdjfasd"
    }
    return (<div>
        <div>
            email : {user?.email},
            password : {user?.password}
        </div>
        <button className='bg-gray-500' onClick={() => {
            dispatch(saveDataUser(newValue))
        }}>
            Save data
        </button>
        <Link to={"/profile"}>
            to profile
        </Link>
    </div>);
}

export default Home;