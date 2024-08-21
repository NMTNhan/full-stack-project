export default function UserCard({userName}) {
    return (
        <div className={'flex flex-col justify-center items-center'}>
            {/*Avatar*/}
            <div>
                <img className={'h-170 w-24 rounded-lg'} src="https://avatarfiles.alphacoders.com/374/thumb-1920-374883.png"/>
            </div>
            {/*User Name*/}
            <div className={'text-black font-bold'}>
                {userName}
            </div>
        </div>
    )
}