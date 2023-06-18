import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { testAPI } from '../api/testAPI';
function Home() {
    const test = useSelector(state => state.test)
    const dispatch = useDispatch()



    return (<div>
        <div>
            test : {test.data}
        </div>
        <button className='bg-gray-500' onClick={() => {
            testAPI(dispatch)
        }}>
            Save data
        </button>
        <Link to={"/profile"}>
            to profile
        </Link>
    </div>);
}

export default Home;