import {useState,useEffect} from "react";
function Body() {
    const [Profile,setProfile] = useState(null);
    const [input,setInput] = useState("");
    async function generateProfile(input) {
        try {
            let data;
            console.log(isNaN(Number(input)));
            if (isNaN(Number(input))) {
                const response = await fetch(`https://api.github.com/users/${input}`);
                if (!response.ok) throw new Error("User not found");
                data = await response.json();
            } else {
                const response = await fetch(`https://api.github.com/users?per_page=${input}`);
                if (!response.ok) throw new Error("Failed to fetch users");
                data = await response.json();
            }
    
            setProfile(data);
        } catch (error) {
            console.error("Error fetching profile:", error.message);
            setProfile(null);
        }
    }
    useEffect(()=>{
        generateProfile("10");
    },[])
    return (
        <>
            <div className="search-field">
                <input type="text" placeholder="search here" value={input} onChange={(e)=>setInput(e.target.value)}/>
                <button onClick={()=>generateProfile(input)}>Search</button>
            </div>
            <div className="profile-container">
                {Profile ? (
                    Array.isArray(Profile) ? (
                        Profile.map((value) => (
                            <div className="card" key={value.id}>  {/* Fix: Add key */}
                                <img src={value.avatar_url} alt="User Avatar" />
                                <h1>{value.login}</h1>
                                <a href={value.html_url} target="_blank" rel="noopener noreferrer">Profile</a>
                            </div>
                        ))
                    ) : (
                        <div className="card">
                            <img src={Profile.avatar_url} alt="User Avatar" />
                            <h1>{Profile.login}</h1>
                            <a href={Profile.html_url} target="_blank" rel="noopener noreferrer">Profile</a>
                        </div>
                    )
                ) : (
                    <p>No profile found.</p>
                )}
            </div>
        </>
    )
}
export default Body; 