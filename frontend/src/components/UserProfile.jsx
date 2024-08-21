export default function UserProfile() {
    return (
        <>
            <div className="bg-black">
                <div className={'bg-gray-600'}>
                    {/*Avatar*/}
                    <div className="absolute rounded-full bg-red-500 ml-5 mt-44 w-40 h-40">

                    </div>
                    {/*Cover picture*/}
                    <div className="flex w-full bg-gradient-to-r from-emerald-500 to-red-500 h-56 place-items-end justify-end">
                        <button
                            className={'bg-sky-500 hover:bg-sky-700 mb-3 mr-3 place-items-center rounded-full w-50 h-10'}>
                            <span className={'text-white font-bold md:px-4 md:py-3'}>Add Friend</span>
                        </button>
                    </div>
                    <div className={' w-full h-32'}>
                        <div className={'ml-48 pt-7 font-bold text-gray-100 w-fit'}>User Name</div>
                    </div>
                </div>
                <div className={'flex bg-gray-700'}>
                    <div className={'flex w-full columns-2xs'}>
                        {/*Information and friend*/}
                        <div className={'w-1/2'}>
                            <div className="w-full max-w-md bg-[#333] rounded-xl shadow-md py-8 px-8 mt-8 ml-8 mr-8">
                                <h2 className={'text-[28px] font-bold text-white mb-6 text-center'}>Information</h2>

                            </div>
                            <div className="w-full max-w-md bg-[#333] rounded-xl shadow-md py-8 px-8 mt-8 ml-8 mr-8">
                                <h2 className={'text-[28px] font-bold text-white mb-6 text-center'}>Friend</h2>

                            </div>
                        </div>

                        <div className={'w-full ml-8'}>
                            <div className={'flex w-11/12 bg-[#333] m-8 rounded-xl divide-y'}>
                                <button className={' bg-gray-500 hover:bg-gray-300 rounded-md w-full text-white py-4 m-3'}>
                                    Write something here!
                                </button>
                                <button className={' bg-gray-500 hover:bg-gray-300 rounded-md w-full text-white m-3'}>
                                    Add photos!
                                </button>
                            </div>
                            <div className={'flex w-11/12 bg-[#333] m-8 rounded-xl'}>
                                Post content
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}