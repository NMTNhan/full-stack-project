import {useState} from "react";
import {Link} from 'react-router-dom'
import {FaEye, FaEyeSlash} from "react-icons/fa";


export default function SignUp({hideIcon, setHideIcon, pwdInputType, setPwdInputType}) {
    const [accountInfo, setAccountInfo] = useState({username: '', password:''})

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
        setAccountInfo({...accountInfo, [event.target.name]: event.target.value})
    }

    // async function register(ev) {
    //     ev.preventDefault()
    //     await fetch('http://localhost:3000/register', {
    //         method: 'POST',
    //         body: JSON.stringify(accountInfo),
    //         headers: {'Content-Type': 'application/json'}
    //     })
    // }

    return (
        <div>
            <div className={'flex h-dvh columns-2'}>
                <div className={'relative'}>
                    <div className={'w-full h-full absolute text-4xl text-blue-950 font-bold m-4'}>
                        ShitBook
                    </div>
                    <div className={'w-full h-full absolute text-center place-content-center'}>
                        <div className={'text-blue-950 font-bold text-6xl text-center'}>
                            Create new account page
                        </div>
                        <div className={'text-blue-950 font-bold text-center text-2xl mt-10'}>
                            You need to create your account to use our service
                        </div>
                    </div>
                    <img className={'w-full h-full'}
                         src="https://img.freepik.com/free-vector/blue-pink-halftone-background_53876-144365.jpg?t=st=1724341655~exp=1724345255~hmac=ace77f146c20e45804647f51d5e8a32e16a6a63847c890d4766d41ada9cc190f&w=1380"
                         alt={'img'}/>
                </div>
                <div className={'w-4/12 content-center'}>
                    <div className={'m-3'}>
                        <h2 className={'text-[28px] font-bold text-black mb-6 text-center'}>Sign Up</h2>
                        <form className={'flex flex-col'}>
                            <div className={'flex space-x-4 mb-4'}>
                                <input placeholder={'First Name'}
                                       className={'bg-gray-100 text-black rounded-md p-2 w-1/2 focus:outline-none transition ease-in duration-150 placeholder-gray-500'}
                                       type='text'/>
                                <input placeholder={'Last Name'}
                                       className={'bg-gray-100 text-black rounded-md p-2 w-1/2 focus:outline-none transition ease-in duration-150 placeholder-gray-500'}
                                       type='text'/>
                            </div>
                            <input placeholder={'Email'}
                                   className={'bg-gray-100 text-black rounded-md p-2 mb-4 focus:outline-none transition ease-in duration-150 placeholder-gray-500'}
                                   type='text'/>
                            <input placeholder={'Username'}
                                   className={'bg-gray-100 text-black rounded-md p-2 mb-4 focus:outline-none transition ease-in duration-150 placeholder-gray-500'}
                                   type='text'
                                   name={'username'}
                                   onChange={ev => {
                                       updateAccountInfo(ev)
                                   }}/>
                            <div className={'flex space-x-4'}>
                                <input placeholder={'Password'}
                                       className={'bg-gray-100 text-black rounded-md p-2 mb-4 w-11/12 focus:outline-none transition ease-in duration-150 placeholder-gray-500'}
                                       type={`${pwdInputType}`}
                                       name={'password'}
                                       onChange={ev => {
                                           updateAccountInfo(ev)
                                       }}/>
                                <button onClick={() => handleOnClick()} type={'button'}>
                                    {hideIcon === "visibility" ? <FaEye className={'text-black text-2xl'}/> : <FaEyeSlash className={'text-black text-2xl'} />}
                                </button>
                            </div>
                            <div className={'flex space-x-4'}>
                                <input placeholder={'Confirm Password'}
                                       className={'bg-gray-100 text-black rounded-md p-2 mb-4 w-11/12 focus:outline-none transition ease-in duration-150 placeholder-gray-500'}
                                       type={`${pwdInputType}`}/>
                                <button onClick={() => handleOnClick()} type={'button'}>
                                    {hideIcon === "visibility" ? <FaEye className={'text-black text-2xl'}/> : <FaEyeSlash className={'text-black text-2xl'} />}
                                </button>
                            </div>
                            <button
                                className={'bg-gradient-to-r from-indigo-500 to-blue-500 text-black font-bold py-2 rounded-md hover:bg-indigo-600 hover:to-blue-600 transition ease-in duration-200'}
                                type={"submit"}>Submit
                            </button>
                            <p className={'text-black mt-4 text-center font-bold'}>Already have an account?
                                {/*<Link to="/login" className={'text-white-500 hover:underline mt-4'}></Link>*/}
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}