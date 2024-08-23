import {useState} from "react";
import {Link, useNavigate} from 'react-router-dom'
import {FaEye, FaEyeSlash} from "react-icons/fa";


export default function SignUp() {
    const [accountInfo, setAccountInfo] = useState({username: '', password: '', email: ''})
    const [pwdInputType, setPwdInputType] = useState({show: false, type: 'password'})
    const [checkConfirmPwd, setCheckConfirmPwd] = useState(true)
    const [checkEmailPattern, setCheckEmailPattern] = useState(true)

    const navigate = useNavigate()

    const handleOnClick = ()=> {
        if (pwdInputType.show) {
            setPwdInputType({show: false, type: 'password'})
        } else {
            setPwdInputType({show: true, type: 'text'})
        }
    }

    const updateAccountInfo = (event)=> {
        setAccountInfo({...accountInfo, [event.target.name]: event.target.value})
    }

    const checkPassword = (pwd, confirmPwd) => {
        setCheckConfirmPwd(pwd === confirmPwd)
    }

    const checkEmail = (ev) => {
        const email = ev.target.value
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        if (email.match(emailPattern)) {
            setCheckEmailPattern(true)
            setAccountInfo({...accountInfo, email: email})
        } else {
            setCheckEmailPattern(false)
        }
    }

    const register = async (ev) => {
        if (checkConfirmPwd && checkEmailPattern) {
            ev.preventDefault()
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(accountInfo)
            })
            if (response.ok) {
                navigate('/login')
            } else {
                console.log('Error')
            }
        }
    }

    return (
        <>
            <div className={'flex h-dvh columns-2'}>
                <div className={'relative'}>
                    <div className={'w-full h-full absolute text-4xl text-blue-950 font-bold m-4'}>
                        SmileBook
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
                <div className={'w-4/12 content-center bg-white'}>
                    <div className={'m-3'}>
                        <h2 className={'text-[28px] font-bold text-black mb-6 text-center'}>Sign Up</h2>
                        <form className={'flex flex-col'}>
                            <input placeholder={'Email'}
                                   className={`bg-gray-100 text-black rounded-md p-2 focus:outline-none transition ease-in duration-150 placeholder-gray-500 ${checkEmailPattern ? 'mb-4' : 'border-red-500 border-2'}`}
                                   type='text'
                                   name={'email'}
                                   onChange={ev => {
                                       checkEmail(ev)
                                   }}/>
                            {!checkEmailPattern && <div>
                                <p className={'text-red-500 text-sm mb-4'}>Invalid email format (Correct example: test@example.com)</p>
                            </div>}
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
                                       type={`${pwdInputType.type}`}
                                       name={'password'}
                                       onChange={ev => {
                                           updateAccountInfo(ev)
                                       }}/>
                                <button onClick={() => handleOnClick()} type={'button'}>
                                    {pwdInputType.show ? <FaEye className={'text-black text-2xl'}/> : <FaEyeSlash className={'text-black text-2xl'} />}
                                </button>
                            </div>
                            <div className={'flex space-x-4'}>
                                <input placeholder={'Confirm Password'}
                                       className={`bg-gray-100 text-black rounded-md p-2 mb-4 w-11/12 focus:outline-none transition ease-in duration-150 placeholder-gray-500 ${checkConfirmPwd ? '' : 'border-red-500 border-2'}`}
                                       type={`${pwdInputType.type}`}
                                        onChange={(ev) => checkPassword(accountInfo.password, ev.target.value)}/>
                                <button onClick={() => handleOnClick()} type={'button'}>
                                    {pwdInputType.show ? <FaEye className={'text-black text-2xl'}/> : <FaEyeSlash className={'text-black text-2xl'} />}
                                </button>
                            </div>
                            {!checkConfirmPwd && <div>
                                <p className={'text-red-500 text-sm'}>Confirm password does not match</p>
                            </div>}
                            <button
                                className={'bg-gradient-to-r from-indigo-500 to-blue-500 text-black font-bold py-2 rounded-md hover:bg-indigo-600 hover:to-blue-600 transition ease-in duration-200'}
                                type={"submit"}
                                onClick={(ev) => register(ev)}
                            >Sign Up
                            </button>
                            <div className={'text-black mt-4 text-center font-bold'}>
                                <Link to="/login" className={'text-white-500 hover:underline mt-4 hover:text-sky-500'}>Already have an account?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}