import { Button } from "@/components/ui/button"
import {
    Field,
    FieldGroup,
} from "@/components/ui/field"
import { AtSign, Lock, Eye, EyeOff, User } from "lucide-react"
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
import { registerPayloadSchema, registerSchema } from "@/schema/authSchema"
import { postRegister } from "@/services/authServices"
import { useMutation } from "@tanstack/react-query"
import { Toaster, toast } from "sonner"


export function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    type RegisterInput = z.infer<typeof registerSchema>;
    type RegisterPayload = z.infer<typeof registerPayloadSchema>;

    // 1. Define your form.
    const form = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            first_name: "",
            last_name: "",
            password: "",
            confirmPassword: "",
        },
    })

    const { isPending, mutateAsync } = useMutation({
        mutationFn: (data: RegisterPayload) => postRegister(data),
        onSuccess: (response) => {
            if (response.status === 0) {
                toast.success(response.message)

                setTimeout(() => navigate('/login'), 1000)
            }
        }
    })

    // 2. Define a submit handler.
    async function onSubmit(values: RegisterInput) {
        try {

            const payload = registerPayloadSchema.parse(values)
            await mutateAsync(payload)

        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Terjadi kesalahan pada server"
            toast.error(errorMessage)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-4 mb-[10px] text-center">
                    <div className="flex items-center gap-2">
                        <img src="/assets/Logo.png" alt="Logo" className="size-8" />
                        <h2 className="text-xl font-bold tracking-tight">SIMS PPOB</h2>
                    </div>
                    <h1 className="text-2xl w-[390px] font-bold leading-tight tracking-tight text-balance">
                        Lengkapi data untuk membuat akun
                    </h1>
                </div>
                <FieldGroup>
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
                        name="first_name"
                        render={({ field }) => (
                            <FormItem>
                                <Field>
                                    <FormLabel>Nama Depan</FormLabel>
                                    <InputGroup>
                                        <InputGroupAddon>
                                            <User className="size-4" />
                                        </InputGroupAddon>
                                        <InputGroupInput
                                            {...field}
                                            type="text"
                                            placeholder="masukan nama depan anda"
                                        />
                                    </InputGroup>
                                    <FormMessage />
                                </Field>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem>
                                <Field>
                                    <FormLabel>Nama Belakang</FormLabel>
                                    <InputGroup>
                                        <InputGroupAddon>
                                            <User className="size-4" />
                                        </InputGroupAddon>
                                        <InputGroupInput
                                            {...field}
                                            type="text"
                                            placeholder="masukan nama belakang anda"
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

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <Field>
                                    <FormLabel>Konfirmasi Password</FormLabel>
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

                    <Field className="pt-2">
                        <Button
                            type="submit"
                            className="bg-[#f42619] hover:bg-[#d11f14] h-12 text-sm font-semibold"
                            disabled={isPending}
                        >
                            Daftar
                        </Button>
                    </Field>
                    <Field className="text-center">
                        <p className="text-sm text-balance">
                            sudah punya akun? login{" "}
                            <Link to="/login" className="font-bold text-[#f42619] hover:underline">
                                di sini
                            </Link>
                        </p>
                    </Field>
                </FieldGroup>

            </form>
            <Toaster richColors position="top-right" />
        </Form>
    )
}
