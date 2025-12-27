import { Button } from "@/components/ui/button"
import {
    Field,
    FieldGroup,
} from "@/components/ui/field"
import { AtSign, Lock, Eye, EyeOff } from "lucide-react"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { loginPayloadSchema } from "@/schema/authSchema"
import { postLogin } from "@/services/authServices"
import { useMutation } from "@tanstack/react-query"
import { Toaster, toast } from "sonner"
import { useDispatch } from "react-redux"
import { setToken } from "@/store/slices/authSlice"

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(loginPayloadSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const { isPending, mutateAsync } = useMutation({
        mutationFn: (data: z.infer<typeof loginPayloadSchema>) => postLogin(data),
        onSuccess: (response) => {
            if (response.status === 0) {
                toast.success(response.message)
                dispatch(setToken(response.data.token))
                setTimeout(() => navigate('/dashboard'), 1000)
            }
        }
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof loginPayloadSchema>) {
        try {
            await mutateAsync(values)
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Terjadi kesalahan pada server"
            toast.error(errorMessage)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex items-center gap-2">
                        <img src="/assets/Logo.png" alt="Logo" className="size-8" />
                        <h2 className="text-xl font-bold tracking-tight">SIMS PPOB</h2>
                    </div>
                    <h1 className="text-2xl w-[390px] font-bold leading-tight tracking-tight text-balance">
                        Masuk atau buat akun untuk memulai
                    </h1>
                </div>

                <div className="flex flex-col gap-4">
                    <FieldGroup className="gap-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <Field>
                                        <FormLabel>Email</FormLabel>
                                        <InputGroup>
                                            <InputGroupAddon>
                                                <AtSign className="size-4" />
                                            </InputGroupAddon>
                                            <InputGroupInput
                                                {...field}
                                                type="email"
                                                placeholder="masukan email anda"
                                            />
                                        </InputGroup>
                                        <FormMessage />
                                    </Field>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <Field>
                                        <FormLabel>Password</FormLabel>
                                        <InputGroup>
                                            <InputGroupAddon>
                                                <Lock className="size-4" />
                                            </InputGroupAddon>
                                            <InputGroupInput
                                                {...field}
                                                type={showPassword ? "text" : "password"}
                                                placeholder="masukan password anda"
                                            />
                                            <InputGroupAddon
                                                className="cursor-pointer"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                            </InputGroupAddon>
                                        </InputGroup>
                                        <FormMessage />
                                    </Field>
                                </FormItem>
                            )}
                        />

                        <Field className="pt-4">
                            <Button
                                type="submit"
                                className="bg-[#f42619] hover:bg-[#d11f14] h-12 text-sm font-semibold"
                                disabled={isPending}
                            >
                                Masuk
                            </Button>
                        </Field>
                        <Field className="text-center">
                            <p className="text-sm text-balance">
                                belum punya akun? registrasi{" "}
                                <Link to="/registration" className="font-bold text-[#f42619] hover:underline">
                                    di sini
                                </Link>
                            </p>
                        </Field>
                    </FieldGroup>
                </div>
            </form>
            <Toaster richColors position="top-right" />
        </Form>
    )
}
