import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useState } from "react";

const Header = () => {
    const [currencyHidden, setCurrencyHidden] = useState(false)
    const user = useSelector((state: RootState) => state.auth.user);
    const balance = useSelector((state: RootState) => state.wallet.balance);

    if (user === null) return null;

    const { profile_image, first_name, last_name } = user;

    return (
        <section className='grid md:grid-cols-2 md:w-[80%] grid-cols-1 w-full gap-4 py-8 px-4'>
            <div className="flex flex-col justify-center gap-6">
                <img src={profile_image} onError={(e) => {
                    e.currentTarget.src = "/assets/Profile Photo.png";
                }} alt="profile photo" className='size-16 rounded-full' />
                <div className='flex flex-col gap-2'>
                    <p>Selamat Datang</p>
                    <h1 className='text-3xl font-bold'>{first_name} {last_name}</h1>
                </div>
            </div>


            <div className='flex flex-col items-center justify-end'>
                <div
                    className="relative w-full h-[180px] bg-no-repeat bg-cover rounded-2xl overflow-hidden shadow-sm"
                    style={{ backgroundImage: "url('/assets/Background Saldo.png')" }}>
                    <div className='absolute inset-0 flex flex-col text-white justify-center px-7 gap-4'>
                        <p className='text-lg font-medium'>Saldo</p>
                        <p className='text-3xl font-bold'>{currencyHidden ? 'Rp.' + balance.toLocaleString('id-ID') : '*****'}</p>
                        <button onClick={() => setCurrencyHidden(state => !state)} className='mt-2 pr-6 flex items-center gap-2 text-sm hover:opacity-80 transition-opacity w-fit'>
                            <span>Lihat Saldo</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header
