import {useState} from "react";
import {Link} from 'react-router-dom'


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
            <div className="flex flex-col items-center justify-center h-screen w-full">
                <div
                    className="w-full max-w-md bg-gradient-to-r from-sky-400 to-sky-200 rounded-xl shadow-md py-8 px-8">
                    <h2 className={'text-[28px] font-bold text-black mb-6 text-center'}>Sign Up</h2>
                    <form className={'flex flex-col'}>
                        <div className={'flex space-x-4 mb-4'}>
                            <input placeholder={'First Name'}
                                   className={'bg-cyan-100 text-black border-0 rounded-md p-2 w-1/2 focus:outline-none transition ease-in duration-150 placeholder-gray-500 border-sky-600 border-2'}
                                   type='text'/>
                            <input placeholder={'Last Name'}
                                   className={'bg-cyan-100 text-black border-0 rounded-md p-2 w-1/2 focus:outline-none transition ease-in duration-150 placeholder-gray-500 border-sky-600 border-2'}
                                   type='text'/>
                        </div>
                        <input placeholder={'Email'}
                               className={'bg-cyan-100 text-black border-0 rounded-md p-2 mb-4 focus:outline-none transition ease-in duration-150 placeholder-gray-500 border-sky-600 border-2'}
                               type='text'/>
                        <input placeholder={'Username'}
                               className={'bg-cyan-100 text-black border-0 rounded-md p-2 mb-4 focus:outline-none transition ease-in duration-150 placeholder-gray-500 border-sky-600 border-2'}
                               type='text'
                               name={'username'}
                               onChange={ev => {
                                   updateAccountInfo(ev)
                               }}/>
                        <div className={'flex space-x-4'}>
                            <input placeholder={'Password'}
                                   className={'bg-cyan-100 text-black border-0 rounded-md p-2 mb-4 w-11/12 focus:outline-none transition ease-in duration-150 placeholder-gray-500 border-sky-600 border-2'}
                                   type={`${pwdInputType}`}
                                   name={'password'}
                                   onChange={ev => {
                                       updateAccountInfo(ev)
                                   }}/>
                            <button onClick={() => handleOnClick()} type={'button'}>
                                <span className={"material-icons text-black"}>{hideIcon}</span>
                            </button>
                        </div>
                        <div className={'flex space-x-4'}>
                            <input placeholder={'Confirm Password'}
                                   className={'bg-cyan-100 text-black border-0 rounded-md p-2 mb-4 w-11/12 focus:outline-none transition ease-in duration-150 placeholder-gray-500 border-sky-600 border-2'}
                                   type={`${pwdInputType}`}/>
                            <button onClick={() => handleOnClick()} type={'button'}>
                                <span className={"material-icons text-black"}>{hideIcon}</span>
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
    )
}