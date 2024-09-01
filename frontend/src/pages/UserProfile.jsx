import NavBar from "../components/NavBar";
import UserCard from "../components/UserCard";
import PostingArea from "../components/PostingArea";
import UserPosts from "../components/UserPosts";
import React, {useState , useEffect} from "react";


export default function UserProfile() {
    
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch posts on component mount
        const fetchPosts = async (userId) => {
            try {
                const url = userId 
                ? `http://localhost:5000/api/posts?userId=${userId}` 
                : `http://localhost:5000/api/posts`;

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        
                if (!response.ok) {
                    throw new Error(`Failed to fetch posts: HTTP error! status: ${response.status}`);
                }
        
                const postsData = await response.json();
                setPosts(postsData);
            } catch (error) {
                console.error(error); 
                setError(error.message); 
            } finally {
                setLoading(false); 
            }
        };
        fetchPosts();
    }, []);
    
    // Function to add a new post
    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    return (
        <>
        <div>
            <NavBar/>
            <div className={'bg-white border-b-2 border-gray-300 border-opacity-50'}>
                {/*Avatar*/}
                <div >
                    <img className=" absolute rounded-full bg-red-500 ml-5 mt-44 w-40 h-40"
                            src="https://img.freepik.com/premium-vector/cute-boy-smiling-cartoon-kawaii-boy-illustration-boy-avatar-happy-kid_1001605-3447.jpg"
                            alt={'img'}
                    />
                </div>
                {/*Cover picture*/}
                <div>
                    <img className="object-cover w-full h-56 place-items-end justify-end"
                            src="https://png.pngtree.com/thumb_back/fh260/background/20230615/pngtree-landscape-landscape-photo-image_2902263.jpg"
                        alt={'img'}/>
                </div>
                <div className={'flex justify-between w-full h-32 '}>
                    <div className={'inline-block ml-48 pt-7 font-bold text-black text-4xl'}>User Name</div>
                    <div className={'inline-block pt-7'}>
                        <button
                            className={'bg-sky-500 hover:bg-sky-700 mb-3 mr-3 place-items-center rounded-full w-50 h-10'}>
                            <span className={'text-white font-bold md:px-4 md:py-3'}>Add Friend</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className={'bg-gray-100'}>
                <div className={'flex w-full columns-2xs'}>
                    {/*Information and friend*/}
                    <div className={'w-1/2'}>
                        <div className="w-full max-w-md bg-gray-50 rounded-xl shadow-md py-8 px-8 mt-8 ml-8 mr-8">
                            <h2 className={'text-[28px] font-bold text-black mb-6 text-center'}>Information</h2>
                            <div>
                                <div className={'flex justify-between mt-4'}>
                                    <div className={'text-black font-bold'}>Name:</div>
                                    <div className={'text-black'}>User Name</div>
                                </div>
                                <div className={'flex justify-between mt-4'}>
                                    <div className={'text-black font-bold'}>Email:</div>
                                    <div className={'text-black'}>Email</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full max-w-md bg-gray-50 rounded-xl shadow-md py-8 px-8 mt-8 ml-8 mr-8">
                            <h2 className={'text-[28px] font-bold text-black mb-6 text-center'}>Friend</h2>
                            <div className={'grid grid-cols-3 gap-4'}>
                                <UserCard userName={"Hoang"}/>
                                <UserCard userName={"Huy"}/>
                                <UserCard userName={"Nhan"}/>
                                <UserCard userName={"The"}/>
                            </div>
                        </div>
                    </div>

                    <div className={'w-full ml-3'}>
                        <div className={'grid grid-cols-1 w-11/12 m-8 rounded-xl'}>
                        <PostingArea addPost={handlePostCreated} />
                                {loading ? (
                                    <p className="text-center">Loading posts...</p>
                                ) : error ? (
                                    <p className="text-center text-red-500">{error}</p>
                                ) : (
                                    <UserPosts posts={posts} />
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}