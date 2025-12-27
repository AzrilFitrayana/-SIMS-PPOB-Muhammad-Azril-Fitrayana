

import { LoginForm } from "@/components/form/login-form"
import { RegisterForm } from "@/components/form/register-form"

export default function AuthPage({ mode }: { mode?: 'login' }) {
    return (
        <div className="grid h-svh lg:grid-cols-2 overflow-hidden">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-[350px]">
                        {mode === 'login' ? <LoginForm /> : <RegisterForm />}
                    </div>
                </div>
            </div>
            <div className="bg-[#fff1f0] relative hidden lg:flex items-center justify-center overflow-hidden">
                <img
                    src="/assets/Illustrasi Login.png"
                    alt="Image"
                    className="h-full w-full object-contain scale-110"
                />
            </div>
        </div>
    )
}

