import CustomerNavbar
    from "../../components/CustomerNavbar";

function CustomerProfileView() {

    return (
        <>
            <CustomerNavbar />

            <div className="container mt-4">

                <div className="card p-4">

                    <h3>
                        My Profile
                    </h3>

                    <hr />

                    <p>

                        <strong>
                            Name:
                        </strong>

                        {" "}

                        {
                            localStorage.getItem(
                                "customerName"
                            )
                        }

                    </p>

                    <p>

                        <strong>
                            Phone:
                        </strong>

                        {" "}

                        {
                            localStorage.getItem(
                                "customerPhone"
                            )
                        }

                    </p>

                    <p>

                        <strong>
                            DOB:
                        </strong>

                        {" "}

                        {
                            localStorage.getItem(
                                "customerDob"
                            )
                        }

                    </p>

                </div>

            </div>
        </>
    );
}

export default CustomerProfileView;