import AuthPage from "@/pages/auth";
import Layout from "@/components/Layout";
import { createBrowserRouter, redirect } from "react-router-dom";
import DashboardPage from "@/pages/dashboard";
import TopUpPage from "@/pages/topup";
import TransactionPage from "@/pages/transaction";
import HistoryPage from "@/pages/history";
import ProfilePage from "@/pages/profile";
import UpdateProfile from "@/pages/updateProfile";

const router = createBrowserRouter([
    {
        path: "/login",
        loader: () => {
            if (localStorage.getItem('token')) return redirect('/dashboard');
            return null;
        },
        element: <AuthPage mode="login" />,
    },
    {
        path: "/registration",
        loader: () => {
            if (localStorage.getItem('token')) return redirect('/dashboard');
            return null;
        },
        element: <AuthPage />,
    },
    {
        path: "*",
        loader: () => {
            const token = localStorage.getItem('token');
            if (token) return redirect('/dashboard');
            return redirect('/login');
        },
    },
    {
        path: '/dashboard',
        loader: () => {
            const token = localStorage.getItem('token');
            if (!token) {
                return redirect("/login");
            }
            return null;
        },
        element: <Layout />,
        children: [
            {
                path: '',
                element: <DashboardPage />
            },
            {
                path: 'top-up',
                element: <TopUpPage />
            },
            {
                path: 'transaction',
                element: <TransactionPage />
            },
            {
                path: 'history',
                element: <HistoryPage />
            },
            {
                path: 'profile',
                element: <ProfilePage />
            },
            {
                path: 'update-profile',
                element: <UpdateProfile />
            }
        ]
    }
]);

export default router;