export default function LogIn({hideIcon, setHideIcon, pwdInputType, setPwdInputType}) {
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
                <div
                    className="w-full max-w-md bg-gradient-to-r from-sky-400 to-sky-200 rounded-xl shadow-md py-8 px-8">
                    <h2 className={'text-[28px] font-bold text-white mb-6 text-center'}>Log In</h2>
                    <form className={'flex flex-col'}>
                        <input placeholder={'Username'}
                               className={'bg-gray-100 text-black border-0 rounded-md p-2 mb-4 focus:outline-none transition ease-in duration-150 placeholder-gray-300'}
                               name={'username'}
                               type='text'
                               onChange={event => updateAccountInfo(event)}/>
                        <div className={'flex space-x-4'}>
                            <input placeholder={'Password'}
                                   className={'bg-gray-100 text-black border-0 rounded-md p-2 mb-4 w-11/12 focus:outline-none transition ease-in duration-150 placeholder-gray-300'}
                                   name={'password'}
                                   type={`${pwdInputType}`}
                                   onChange={event => updateAccountInfo(event)}/>
                            <button onClick={() => handleOnClick()} type={'button'}>
                                <span className={"material-icons place-content-center text-gray-600"}>{hideIcon}</span>
                            </button>
                        </div>
                        <button
                            className={'bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium py-2 rounded-md hover:bg-indigo-600 hover:to-blue-600 transition ease-in duration-200'}
                            type={"submit"}>Log In
                        </button>
                        <div className={'divider'}></div>
                        <button
                            className={'bg-gradient-to-r from-emerald-500 to-green-500 text-white font-medium py-2 rounded-md hover:bg-emerald-600 hover:to-green-600 transition ease-in duration-200'}
                            type={"submit"}>Create New Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}