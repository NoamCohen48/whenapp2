import { useUserContext } from '../../../Contexts/UserContextProvider';
import DialogScreen from '../DialogScreen/DialogScreen.js';
import SideBar from '../SideBar/SideBar.js';
import './ChatScreen.css';

function ChatScreen(props) {
    const { currentUser } = useUserContext()

    if (currentUser === null) {
        //return <Navigate to="/" replace={true} />
        return <h1>Loading</h1>
    }

    return (
        <>
            <div className='container-xl chat-container c-shadow'>
                <div className='row'>
                    <div className="col-4 side-bar" >
                        <SideBar />
                    </div>
                    <div className="col-8 dialog-screen" >
                        <DialogScreen />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatScreen;