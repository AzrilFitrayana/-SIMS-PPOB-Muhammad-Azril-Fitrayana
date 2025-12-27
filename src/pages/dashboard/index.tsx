import Promo from '../../components/promo/Promo'
import Services from '../../components/services/Services'

const DashboardPage = () => {
    return (
        <section className='flex flex-col justify-center'>

            <div className='md:w-[80%] w-full mx-auto'>
                <Services />
            </div>

            <Promo />
        </section>
    )
}

export default DashboardPage