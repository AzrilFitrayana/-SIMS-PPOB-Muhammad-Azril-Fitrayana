import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const activeStyle = ({ isActive }: { isActive: boolean }) =>
        isActive ? "text-red-500 font-bold" : "hover:text-red-500 transition-colors";

    return (
        <nav className="sticky top-0 z-50 bg-white w-full border-b-2">
            <div className="flex flex-row justify-between items-center py-4 px-6 md:w-[80%] mx-auto md:px-0">
                <NavLink to="/dashboard" className="flex flex-row items-center gap-2">
                    <img src="/assets/Logo.png" alt="logo" className="size-6 md:size-8" />
                    <span className="font-bold text-base md:text-xl">SIMS PPOB</span>
                </NavLink>

                {/* Desktop Menu */}
                <div className="hidden md:flex flex-row items-center gap-10">
                    <ul className="flex flex-row items-center gap-10 font-semibold text-sm lg:text-base">
                        <li>
                            <NavLink to="/dashboard/top-up" className={activeStyle}>Top Up</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/transaction" className={activeStyle}>Transaction</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/profile" className={activeStyle}>Akun</NavLink>
                        </li>
                    </ul>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="p-1 focus:outline-none">
                        {isOpen ? <X className="size-6 text-red-500" /> : <Menu className="size-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white border-b-2 shadow-lg animate-in fade-in slide-in-from-top-4 duration-300 z-50">
                        <ul className="flex flex-col p-6 gap-4 font-semibold">
                            <li className="border-b pb-2">
                                <NavLink to="/dashboard/top-up" onClick={() => setIsOpen(false)} className={activeStyle}>Top Up</NavLink>
                            </li>
                            <li className="border-b pb-2">
                                <NavLink to="/dashboard/transaction" onClick={() => setIsOpen(false)} className={activeStyle}>Transaction</NavLink>
                            </li>
                            <li className="border-b pb-2">
                                <NavLink to="/dashboard/profile" onClick={() => setIsOpen(false)} className={activeStyle}>Akun</NavLink>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
