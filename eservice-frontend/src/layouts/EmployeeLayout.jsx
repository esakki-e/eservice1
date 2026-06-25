function EmployeeLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-50">

            <div className="
                bg-white
                border-b
                border-slate-200
                px-8
                py-4
                shadow-sm
            ">
                <h1 className="text-xl font-bold text-slate-800">
                    Employee Portal
                </h1>
            </div>

            <div className="p-8">
                {children}
            </div>

        </div>
    );
}

export default EmployeeLayout;