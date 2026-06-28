import Navbar from "../components/Navbar";

function EmployeeLayout({ children }) {

    return (

        <>

            <Navbar />

            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white">

                {children}

            </div>

        </>

    );

}

export default EmployeeLayout;