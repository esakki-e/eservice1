import Navbar from "../components/Navbar";
function EmployeeLayout({ children }) {

    return (

        <>

            <Navbar />

            <div className="employee-layout">

                {children}

            </div>

        </>

    );

}

export default EmployeeLayout;