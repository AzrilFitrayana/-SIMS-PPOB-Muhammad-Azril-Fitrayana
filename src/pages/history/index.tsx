import { getHistoryTransaction } from "@/services/userServices"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import Loading from "@/components/Loading"

interface History {
    invoice_number: string,
    transaction_type: string,
    description: string,
    total_amount: number,
    created_on: string
}

const HistoryPage = () => {

    const offset = 0
    const [limit, setLimit] = useState(5)

    const { data, isLoading, isFetching, isError } = useQuery({
        queryKey: ['history', offset, limit],
        queryFn: () => getHistoryTransaction({ offset, limit }),
        placeholderData: (prev) => prev,
    })

    const history = data?.data;

    const hasMore = history?.records.length === limit;

    return (
        <section id='history' className='w-[80%] flex flex-col gap-6 mx-auto mb-8'>
            <div className="w-full flex flex-col gap-2">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    Semua Transaksi
                </h2>
            </div>

            <div className="w-full flex flex-col gap-4">

                {history?.records.map((item: History) => (
                    (
                        item.transaction_type === 'PAYMENT' ? (
                            <div key={item.invoice_number} className="flex flex-row justify-between px-6 py-6 border border-gray-200 rounded-lg">
                                <div className="flex flex-col gap-4">
                                    <h1 className="text-2xl font-semibold text-red-600">- Rp.{item.total_amount.toLocaleString('id-ID')}</h1>
                                    <p className='text-sm font-light text-gray-400'>{new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Jakarta' }).format(new Date(item.created_on))} WIB</p>
                                </div>
                                <div>
                                    <p className="text-sm">{item.transaction_type}</p>
                                </div>
                            </div>
                        ) : (
                            <div key={item.invoice_number} className="flex flex-row justify-between px-6 py-6 border border-gray-200 rounded-lg">
                                <div className="flex flex-col gap-4">
                                    <h1 className="text-2xl font-semibold text-green-600">+ Rp.{item.total_amount.toLocaleString('id-ID')}</h1>
                                    <p className='text-sm font-light text-gray-400'>{new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Jakarta' }).format(new Date(item.created_on))} WIB</p>
                                </div>
                                <div>
                                    <p className="text-sm">{item.transaction_type}</p>
                                </div>
                            </div>
                        )
                    )
                ))}
            </div>

            {hasMore && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => setLimit((prev) => prev + 5)}
                        className="cursor-pointer text-xl text-red-500 font-semibold hover:text-red-400"
                        disabled={isFetching}
                    >
                        Show More
                    </button>
                </div>
            )}

            {isLoading && <Loading />}
            {isFetching && <Loading />}
            {isError && <p className="text-center text-red-500">Error fetching data</p>}
        </section>
    )
}

export default HistoryPage