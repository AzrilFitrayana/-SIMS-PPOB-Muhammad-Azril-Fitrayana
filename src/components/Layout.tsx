import Header from './Header'
import Navbar from './Navbar'
import { Outlet, useMatch } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getBalance, getUserProfile } from '@/services/userServices'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/slices/authSlice'
import { useEffect } from 'react'
import { setBalance } from '@/store/slices/balance'
import Loading from '@/components/Loading'

const Layout = () => {
    const dispatch = useDispatch();

    const { data: profile, isLoading: isProfileLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: () => getUserProfile(),
    })

    const { data: balance, isLoading: isBalanceLoading } = useQuery({
        queryKey: ['balance'],
        queryFn: () => getBalance(),
    })

    useEffect(() => {
        if (profile?.data) {
            dispatch(setUser(profile.data))
        }

        if (balance?.data) {
            dispatch(setBalance(balance.data.balance))
        }
    }, [profile, balance, dispatch])

    const isPreviewProfilePage = useMatch("/dashboard/profile");
    const isPreviewProfileEditPage = useMatch("/dashboard/update-profile");

    if (isProfileLoading || isBalanceLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
            </div>
        )
    }

    return (
        <>
            {isPreviewProfilePage !== null || isPreviewProfileEditPage !== null ? (
                <>
                    <Navbar />
                    <div className='flex flex-col w-full items-center '>
                        <main className='w-full flex flex-col justify-center items-center gap-10'>
                            <div className='w-full'>
                                <Outlet />
                            </div>
                        </main>
                    </div>
                </>
            ) : (
                <>
                    <Navbar />
                    <div className='flex flex-col w-full items-center '>
                        <main className='w-full flex flex-col justify-center items-center gap-10'>
                            <Header />
                            <div className='w-full'>
                                <Outlet />
                            </div>
                        </main>
                    </div>
                </>
            )}
        </>
    )
}

export default Layout