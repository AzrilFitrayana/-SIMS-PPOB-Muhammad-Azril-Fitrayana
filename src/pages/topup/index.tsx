import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Banknote } from "lucide-react"
import { topUpSchema } from "@/schema/authSchema"
import { postTopUp } from "@/services/userServices"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { Toaster, toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"

const TopUpPage = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    // 1. Define your form.
    const form = useForm<z.infer<typeof topUpSchema>>({
        resolver: zodResolver(topUpSchema),
        mode: "onChange",
        defaultValues: {
            top_up_amount: 0,
        },
    })

    const { mutateAsync } = useMutation({
        mutationFn: (data: z.infer<typeof topUpSchema>) => postTopUp(data),
        onSuccess: (response) => {
            if (response.status === 0) {
                toast.success(response.message)
                queryClient.invalidateQueries({ queryKey: ['balance'] })
                setTimeout(() => {
                    navigate('/dashboard')
                }, 1000)
            }
        }
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof topUpSchema>) {
        try {
            mutateAsync(values)
        } catch (error: any) {
            const errorMessage = error.response.data.message || 'Terjadi kesalahan pada server'
            toast.error(errorMessage)
        }
    }

    return (
        <section id='topup' className='w-[80%] flex flex-col gap-10 mx-auto'>
            <div className="w-full flex flex-col gap-2">
                <p className="text-xl">Silahkan masukan</p>
                <h2 className="text-2xl font-bold">Nominal Top Up</h2>
            </div>

            <div className="w-full grid grid-cols-2 gap-4">
                <div className="flex flex-col justify-center">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="top_up_amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <InputGroup className="p-6">
                                                <InputGroupAddon>
                                                    <Banknote className="size-6" />
                                                </InputGroupAddon>
                                                {/* <Input placeholder="Masukan Nominal Top Up" {...field} /> */}
                                                <InputGroupInput
                                                    id="top_up_amount"
                                                    type="number"
                                                    placeholder="Masukan nominal top up"
                                                    required
                                                    value={field.value === 0 ? '' : field.value}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </InputGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full bg-red-500 p-6" disabled={!form.formState.isDirty || !form.formState.isValid}>Top Up</Button>
                        </form>
                    </Form>
                </div>


                <div className="w-full grid grid-cols-3 gap-4">
                    <button className="border border-red-500 p-4 rounded-sm text-center cursor-pointer hover:bg-red-500 hover:text-white" onClick={() => form.setValue("top_up_amount", 10000, { shouldDirty: true, shouldValidate: true })}>
                        Rp10.000
                    </button>
                    <button className="border border-red-500 p-4 rounded-sm text-center cursor-pointer hover:bg-red-500 hover:text-white" onClick={() => form.setValue('top_up_amount', 20000, { shouldDirty: true, shouldValidate: true })}>
                        Rp20.000
                    </button>
                    <button className="border border-red-500 p-4 rounded-sm text-center cursor-pointer hover:bg-red-500 hover:text-white" onClick={() => form.setValue('top_up_amount', 50000, { shouldDirty: true, shouldValidate: true })}>
                        Rp50.000
                    </button>
                    <button className="border border-red-500 p-4 rounded-sm text-center cursor-pointer hover:bg-red-500 hover:text-white" onClick={() => form.setValue('top_up_amount', 100000, { shouldDirty: true, shouldValidate: true })}>
                        Rp100.000
                    </button>
                    <button className="border border-red-500 p-4 rounded-sm text-center cursor-pointer hover:bg-red-500 hover:text-white" onClick={() => form.setValue('top_up_amount', 200000, { shouldDirty: true, shouldValidate: true })}>
                        Rp200.000
                    </button>
                    <button className="border border-red-500 p-4 rounded-sm text-center cursor-pointer hover:bg-red-500 hover:text-white" onClick={() => form.setValue('top_up_amount', 500000, { shouldDirty: true, shouldValidate: true })}>
                        Rp500.000
                    </button>
                </div>
            </div>

            <Toaster richColors position="top-right" />
        </section>
    )
}

export default TopUpPage