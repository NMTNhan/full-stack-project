import {useNavigate} from "react-router-dom";

export default function UserCard({ friend }) {

    const navigate = useNavigate()

    if (!friend) {
        return <div>Loading...</div>; // Handle loading or undefined friend case
      }

    const handleClick = () => {
        navigate(`/friend/${friend._id}`, {state: {friendProfile: friend}});
    }

    return (
        <div key={friend.id} className={'flex flex-col justify-center items-center hover:bg-gray-300 max-h-170 max-w-24'} onClick={() => handleClick()}>
            {/*Avatar*/}
            <div>
                <img className={'h-170 w-24 rounded-lg'} src="https://avatarfiles.alphacoders.com/374/thumb-1920-374883.png" alt={'img'}/>
            </div>
            {/*User Name*/}
            <div className={'text-black font-bold'}>
                {friend.username}
            </div>
        </div>
    )
}