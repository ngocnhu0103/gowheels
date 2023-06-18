import { useSelector } from "react-redux";

function ProfilePage() {
    const user = useSelector(state => state.user.value)
    return (
        <div>
            Profile

            <div>
                email : {user?.email},
                password : {user?.password}
            </div>
        </div>);
}

export default ProfilePage;

