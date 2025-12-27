import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useQuery } from "@tanstack/react-query"
import { getBanner } from "@/services/userServices"
import Loading from "../Loading"

interface Banner {
    banner_name: string;
    banner_image: string;
}

const Promo = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["banner"],
        queryFn: () => getBanner()
    });

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    const banner = data?.data

    const banner2 = [
        {
            banner_name: "Banner 1",
            banner_image: "/assets/Banner 1.png"
        },
        {
            banner_name: "Banner 2",
            banner_image: "/assets/Banner 2.png"
        },
        {
            banner_name: "Banner 3",
            banner_image: "/assets/Banner 1.png"
        }
    ]

    return (
        <div id="promo" className="mt-6 mb-6 overflow-hidden">

            <div className='max-w-[80%] md:mx-auto ml-4 mb-4'>
                <p className="text-xl font-semibold">Temukan promo menarik</p>
            </div>


            <ScrollArea className="w-full whitespace-nowrap mx-4 pr-4 md:ml-[190px] md:pr-[10%]">
                <div className="flex gap-8 pb-4">
                    {banner?.map((item: Banner, index: number) => (
                        <div key={index} className="flex-none cursor-pointer">
                            <img src={item.banner_image} alt={item.banner_name} className="w-[270px] h-[121px]" />
                        </div>
                    ))}
                </div>

                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div >
    )
}

export default Promo