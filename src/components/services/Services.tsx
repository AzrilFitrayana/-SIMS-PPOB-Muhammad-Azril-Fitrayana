import { getServices } from "@/services/userServices";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Service {
    service_code: string;
    service_name: string;
    service_icon: string;
    service_tariff: number;
}

const Services = () => {
    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['service'],
        queryFn: () => getServices(),
    })

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    const handleSelectService = (service: Service) => {
        navigate('/dashboard/transaction', { state: service })
    }

    return (
        <ScrollArea className="w-full whitespace-nowrap mx-4 pr-4">
            <div id="service" className='flex flex-row justify-between md:justify-center lg:justify-between gap-4 md:gap-8 lg:gap-2 pb-4'>
                {data?.data.map((item: Service) => (
                    <div
                        onClick={() => handleSelectService(item)}
                        key={item.service_code}
                        className="cursor-pointer flex-none w-[75px] h-full flex flex-col items-center gap-2 text-center"
                    >
                        <div className='flex items-center justify-center transition-transform hover:scale-110'>
                            <img src={item.service_icon} alt={item.service_name} className="size-16" />
                        </div>
                        <p className='text-[10px] md:text-sm font-normal whitespace-normal break-words w-full'>{item.service_name}</p>
                    </div>
                ))}
            </div>
            <ScrollBar orientation="horizontal" className="md:hidden" />
        </ScrollArea>
    )
}

export default Services