export default function FriendRequestCard({friendRequest}) {
    return (
        <div className={'rounded-md w-450 bg-gray-300'}>
            <div className={'flex-auto justify-center items-center m-2 w-450'}>
                <div className={'flex-auto'}>
                    <img className={'h-9 w-9 rounded-lg'} src={`${friendRequest.senderID.avatar}`} alt={'img'}/>
                    <p>{`${friendRequest.senderID.username} sent you a friend request.`}</p>
                </div>
                <div className={'block-flex'}>
                    <div className={'inline-flex'}>
                        <button className={'bg-green-500 text-white rounded-md p-2 hover:bg-green-900'}
                                onClick={() => console.log('Accepted')}>Accept
                        </button>
                        <button className={'bg-red-500 text-white rounded-md p-2 hover:bg-red-700 ml-2'}
                                onClick={() => console.log('Declined')}>Decline
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}