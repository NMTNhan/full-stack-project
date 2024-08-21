export default function SignUp({hideIcon, setHideIcon, pwdInputType, setPwdInputType}) {
    function handleOnClick() {
        {
            if (hideIcon === "visibility") {
                setHideIcon("visibility_off")
                setPwdInputType("text")
            } else {
                setHideIcon("visibility")
                setPwdInputType("password")
            }
        }
    }

    return (
        <div>
            <div className="flex flex-col items-center justify-center h-screen w-full">
                <div className="w-full max-w-md bg-[#222] rounded-xl shadow-md py-8 px-8">
                    <h2 className={'text-[28px] font-bold text-white mb-6 text-center'}>Sign Up</h2>
                    <form className={'flex flex-col'}>
                        <div className={'flex space-x-4 mb-4'}>
                            <input placeholder={'First Name'}
                                   className={'bg-gray-700 text-white border-0 rounded-md p-2 w-1/2 focus:outline-none transition ease-in duration-150 placeholder-gray-300'}
                                   type='text'/>
                            <input placeholder={'Last Name'}
                                   className={'bg-gray-700 text-white border-0 rounded-md p-2 w-1/2 focus:outline-none transition ease-in duration-150 placeholder-gray-300'}
                                   type='text'/>
                        </div>
                        <input placeholder={'Email'}
                               className={'bg-gray-700 text-white border-0 rounded-md p-2 mb-4 focus:outline-none transition ease-in duration-150 placeholder-gray-300'}
                               type='text'/>
                        <input placeholder={'Username'}
                               className={'bg-gray-700 text-white border-0 rounded-md p-2 mb-4 focus:outline-none transition ease-in duration-150 placeholder-gray-300'}
                               type='text'/>
                        <div className={'flex space-x-4'}>
                            <input placeholder={'Password'}
                                   className={'bg-gray-700 text-white border-0 rounded-md p-2 mb-4 w-11/12 focus:outline-none transition ease-in duration-150 placeholder-gray-300'}
                                   type={`${pwdInputType}`}/>
                            <button onClick={() => handleOnClick()} type={'button'}>
                                <span className={"material-icons"}>{hideIcon}</span>
                            </button>
                        </div>
                        <div className={'flex space-x-4'}>
                            <input placeholder={'Confirm Password'}
                                   className={'bg-gray-700 text-white border-0 rounded-md p-2 mb-4 w-11/12 focus:outline-none transition ease-in duration-150 placeholder-gray-300'}
                                   type={`${pwdInputType}`}/>
                            <button onClick={() => handleOnClick()} type={'button'}>
                                <span className={"material-icons"}>{hideIcon}</span>
                            </button>
                        </div>
                        <button
                            className={'bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium py-2 rounded-md hover:bg-indigo-600 hover:to-blue-600 transition ease-in duration-200'}
                            type={"submit"}>Submit
                        </button>
                        <p className={'text-white mt-4 text-center'}>Already have an account?
                            <a href="#" className={'text-white-500 hover:underline mt-4'}></a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}