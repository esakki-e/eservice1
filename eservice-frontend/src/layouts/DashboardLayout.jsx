import { Link } from "react-router-dom";

function DashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen">

            {/* Sidebar */}
            <aside
                className="
    w-64
    h-screen
    sticky
    top-0
    bg-slate-950
    border-r
    border-slate-800
    text-white
    shadow-2xl
    p-6
    flex
    flex-col
  "
            >
                {/* Logo */}
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight mb-10">                        Vinayaga
                        <span className="block bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">                            Portal
                        </span>
                    </h2>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-2">

                        <Link
                            to="/dashboard"
                            className="
group
flex
items-center
gap-3
px-4
py-3
rounded-2xl
text-slate-400
hover:text-white
hover:bg-slate-900
transition-all
duration-300
font-medium
no-underline
"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/requests"
                            className="
group
flex
items-center
gap-3
px-4
py-3
rounded-2xl
text-slate-400
hover:text-white
hover:bg-slate-900
transition-all
duration-300
font-medium
no-underline
"
                        >
                            Requests
                        </Link>

                        <Link
                            to="/services"
                            className="
group
flex
items-center
gap-3
px-4
py-3
rounded-2xl
text-slate-400
hover:text-white
hover:bg-slate-900
transition-all
duration-300
font-medium
no-underline
"
                        >
                            Services
                        </Link>

                        <Link
                            to="/services/create"
                            className="
group
flex
items-center
gap-3
px-4
py-3
rounded-2xl
text-slate-400
hover:text-white
hover:bg-slate-900
transition-all
duration-300
font-medium
no-underline
"
                        >
                            Create Service
                        </Link>

                        <Link
                            to="/employees"
                            className="
group
flex
items-center
gap-3
px-4
py-3
rounded-2xl
text-slate-400
hover:text-white
hover:bg-slate-900
transition-all
duration-300
font-medium
no-underline
"
                        >
                            Employees
                        </Link>

                        <Link
                            to="/users"
                            className="
group
flex
items-center
gap-3
px-4
py-3
rounded-2xl
text-slate-400
hover:text-white
hover:bg-slate-900
transition-all
duration-300
font-medium
no-underline
"
                        >
                            Users
                        </Link>

                    </nav>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-800">

                {/* Logout */}
                <div className="mt-auto pt-8">
                    <button
                        className="
    w-full
    mt-6
    px-4
    py-3
    rounded-2xl
    bg-slate-900
    border
    border-red-500/20
    text-red-400
    hover:bg-red-500
    hover:text-white
    hover:border-red-500
    transition-all
    duration-300
    font-semibold
    shadow-lg
    "
                        onClick={() => {
                            localStorage.clear();
                            window.location.href = "/";
                        }}
                    >
                        Logout
                    </button>
                </div>
                </div>

            </aside>

            {/* Main Content */}
            <main
                className="
                    flex-1
                    min-h-screen
                    bg-[#f8fafc]
                    p-10
                "
            >
                {children}
            </main>

        </div>
    );
}

export default DashboardLayout;