import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
} from "@/components/ui/form"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Banknote } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { transactionSchema } from "@/schema/authSchema"
import { Toaster, toast } from "sonner"
import { postTransaction } from "@/services/userServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const TransactionPage = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    type TransactionInput = z.infer<typeof transactionSchema>;

    if (!state) {
        return (
            <div className="w-full text-center py-10">
                <p>Silahkan pilih layanan terlebih dahulu di Dashboard.</p>
                <Button onClick={() => navigate('/dashboard')} className="mt-4 bg-red-500 hover:bg-red-600 px-4 py-6">Kembali ke Dashboard</Button>
            </div>
        )
    }

    const { service_code, service_tariff, service_name, service_icon } = state

    // 1. Define your form.
    const form = useForm<TransactionInput>({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            service_code,
        },
    })

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (data: TransactionInput) => postTransaction(data),
        onSuccess: (response) => {
            if (response.status === 0) {
                toast.success(response.message)
                queryClient.invalidateQueries({ queryKey: ['balance'] })

                setTimeout(() => navigate('/dashboard/history'), 1000)
            }
        }
    })

    // 2. Define a submit handler.
    function onSubmit(values: TransactionInput) {
        try {
            mutateAsync(values)
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Terjadi kesalahan pada server"
            toast.error(errorMessage)
        }
    }

    return (
        <section id='transaction' className='w-[80%] flex flex-col gap-6 mx-auto'>
            <div className="w-full flex flex-col gap-2">
                <p className="text-xl">PemBayaran</p>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <img src={service_icon} alt="listrik" className="w-6 h-6" /> {service_name}</h2>
            </div>

            <div className="w-full gap-4">
                <div className="flex flex-col justify-center">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <InputGroup className="p-6">
                                <InputGroupAddon>
                                    <Banknote className="size-6" />
                                </InputGroupAddon>
                                <InputGroupInput
                                    value={service_tariff.toLocaleString('id-ID')}
                                    disabled
                                />
                            </InputGroup>


                            <FormField
                                control={form.control}
                                name="service_code"
                                render={({ field }) => (
                                    <input type='hidden' {...field} />
                                )}
                            />
                            <Button type="submit" disabled={isPending} className="w-full bg-red-500 hover:bg-red-600 p-6">Bayar</Button>
                        </form>
                    </Form>
                </div>
            </div>
            <Toaster richColors position="top-right" />
        </section>
    )
}

export default TransactionPage