import React , {useCallback} from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/component/Header";
import Body from "./src/component/Body";
function GithubProfile() {
    return (
        <>
            <Header/>
            <Body/>
        </>
    )
}
const root = ReactDOM.createRoot(document.getElementById('root')).render(<GithubProfile/>)