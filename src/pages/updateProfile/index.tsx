import { AtSign, Pencil, User } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Field,
    FieldGroup,
} from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { updateProfileSchema } from '@/schema/authSchema'
import { putUserProfile } from '@/services/userServices'
import { useMutation } from '@tanstack/react-query'
import { Toaster, toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'


const UpdateProfile = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(updateProfileSchema),
        values: {
            first_name: user?.first_name || "",
            last_name: user?.last_name || "",
        },
    });

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (data: z.infer<typeof updateProfileSchema>) => putUserProfile(data),
        onSuccess: (response) => {
            if (response.status === 0) {
                queryClient.invalidateQueries({ queryKey: ["profile"] });

                toast.success("Profile berhasil diperbarui");
                setTimeout(() => {
                    navigate("/dashboard/profile");
                }, 1000);
            }
        }
    })

    if (!user) return null;

    const { profile_image, first_name, last_name, email } = user;


    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof updateProfileSchema>) {
        try {
            await mutateAsync(values)

        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Terjadi kesalahan pada server"
            toast.error(errorMessage)
        }
    }

    return (
        <section id="update-profile" className="md:w-[80%] w-full flex flex-col justify-center items-center mx-auto gap-10 mt-8">
            <Toaster richColors position="top-right" />
            <div className="flex flex-col items-center gap-2">
                <div className="relative cursor-pointer">
                    <img src={profile_image} onError={(e) => e.currentTarget.src = "/assets/Profile Photo.png"} alt="foto profile" className="w-28 h-28 rounded-full relative" />
                    <div className="absolute bottom-0 right-0 border rounded-full p-1 z-10">
                        <Pencil className="size-4" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold">{first_name} {last_name}</h1>
            </div>

            <div className="flex flex-col items-center gap-6 md:w-[50%] w-[80%]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <FieldGroup>
                            <Field>
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <InputGroup className="cursor-pointer px-2 py-6 border rounded-sm">
                                        <InputGroupAddon>
                                            <AtSign className="size-4" />
                                        </InputGroupAddon>
                                        <InputGroupInput
                                            id="email"
                                            type="email"
                                            placeholder="masukan email anda"
                                            value={email || ""}
                                            disabled
                                        />
                                    </InputGroup>
                                </FormItem>
                            </Field>
                            <Field>
                                <FormField
                                    control={form.control}
                                    name="first_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nama Depan</FormLabel>
                                            <InputGroup className="cursor-pointer px-2 py-6 border rounded-sm">
                                                <InputGroupAddon>
                                                    <User className="size-4" />
                                                </InputGroupAddon>
                                                <InputGroupInput
                                                    id="first_name"
                                                    type="text"
                                                    placeholder="masukan nama depan anda"
                                                    {...field}
                                                    required
                                                />
                                            </InputGroup>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </Field>
                            <Field>
                                <FormField
                                    control={form.control}
                                    name="last_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nama Belakang</FormLabel>
                                            <InputGroup className="cursor-pointer px-2 py-6 border rounded-sm">
                                                <InputGroupAddon>
                                                    <User className="size-4" />
                                                </InputGroupAddon>
                                                <InputGroupInput
                                                    id="last_name"
                                                    type="text"
                                                    placeholder="masukan nama belakang anda"
                                                    {...field}
                                                    required
                                                />
                                            </InputGroup>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </Field>
                        </FieldGroup>
                        <Button type="submit" disabled={isPending} className="cursor-pointer w-full bg-red-500 hover:bg-white hover:border hover:border-red-500 hover:text-red-500 p-6">Simpan</Button>
                    </form>
                </Form>
            </div>
        </section>
    )
}

export default UpdateProfile