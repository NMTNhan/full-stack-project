import {useState} from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa";

export default function Login({hideIcon, setHideIcon, pwdInputType, setPwdInputType}) {
    const [account, setAccount] = useState({username: '', password: ''})

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

    function updateAccountInfo(event) {
        setAccount({...account, [event.target.name]: event.target.value})
    }

    return (
        <>
            <div className={'flex h-dvh columns-2'}>
                <div className={'relative'}>
                    <div className={'w-full h-full absolute text-4xl text-blue-950 font-bold m-4'}>
                        ShitBook
                    </div>
                    <div className={'w-full h-full absolute text-center place-content-center'}>
                        <div className={'text-blue-950 font-bold text-6xl text-center'}>
                            Welcome Page
                        </div>
                        <div className={'text-blue-950 font-bold text-center text-2xl mt-10'}>
                            Sign in to continue access
                        </div>
                    </div>
                    <img className={'w-full h-full'}
                         src="https://img.freepik.com/free-vector/blue-pink-halftone-background_53876-144365.jpg?t=st=1724341655~exp=1724345255~hmac=ace77f146c20e45804647f51d5e8a32e16a6a63847c890d4766d41ada9cc190f&w=1380"
                         alt={'img'}/>
                </div>
                <div className={'w-4/12 content-center'}>
                    <div className={'m-3'}>
                        <h2 className={'text-[28px] font-bold text-black mb-6 text-center'}>Log In</h2>
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
                                <button type={'button'} className={'place-items-center'}>
                                    {hideIcon === "visibility" ? <FaEye className={'text-black text-2xl'}/> : <FaEyeSlash className={'text-black text-2xl'} />}
                                </button>
                            </div>
                            <button
                                className={'bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium py-2 rounded-md hover:bg-indigo-600 hover:to-blue-600 transition ease-in duration-200'}
                                type={"submit"}
                                onClick={() => {
                                    console.log(account)
                                }}>Log In
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
        </>
    )
}