import { Navigate } from "react-router-dom";
const BuyCrypto = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("Please login to access this page.");
        return <Navigate to="/login" />;
    }
    return (
        <div className="buy-crypto">
        <h1>Buy Crypto</h1>
        <p>Feature coming soon!</p>
        <p>Stay tuned for updates.</p>
        </div>
    );
}
export default BuyCrypto;