import {fetchProtectedData} from '../logic/AuthController';
export default function User() {


    return (
        <>
            <button onClick={fetchProtectedData}>
                Fetch Protected Data
            </button>
        </>
    )
}