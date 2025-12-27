import { AtSign, Pencil, User } from "lucide-react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { useDispatch } from "react-redux"
import { setLogout } from "@/store/slices/authSlice"
import { Link, useNavigate } from "react-router-dom"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { useRef } from "react"
import { Toaster, toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { putUserGambar } from "@/services/userServices"

const ProfilePage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user)
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { mutateAsync } = useMutation({
        mutationFn: (data: FormData) => putUserGambar(data),
        onSuccess: (response) => {
            if (response.status === 0) {
                queryClient.invalidateQueries({
                    queryKey: ["profile"]
                })
                toast.success(response.message)
            }
        }
    });

    if (!user) return null;

    const { email, first_name, last_name, profile_image } = user;

    const handleLogout = () => {
        dispatch(setLogout());
        navigate('/login');
    }

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];

            if (!file) {
                toast.error('Image tidak ditemukan');
                return;
            }

            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                toast.error('Format Image tidak sesuai');
                return;
            }

            if (file.size > 200 * 1024) {
                toast.error('Ukuran Image maksimal 100kb')
                return;
            }

            const formData = new FormData();
            formData.append('file', file)

            await mutateAsync(formData);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Terjadi kesalahan pada server"
            toast.error(errorMessage)
        }
    }

    return (
        <section id="profile" className="md:w-[80%] w-full flex flex-col justify-center items-center mx-auto gap-10 mt-8">
            <div className="flex flex-col items-center gap-2">
                <div className="relative cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <input
                        type="file"
                        id="image"
                        accept="image/jpeg, image/png"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    <img src={profile_image} onError={(e) => e.currentTarget.src = "/assets/Profile Photo.png"} alt="foto profile" className="w-28 h-28 rounded-full relative object-cover" />
                    <div className="absolute bottom-0 right-0 border bg-white rounded-full p-1 z-10">
                        <Pencil className="size-4" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold">{first_name} {last_name}</h1>
            </div>

            <div className="flex flex-col items-center gap-6 md:w-[50%] w-[80%]">
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="Email">Email</label>
                    <InputGroup className="px-2 py-6 border rounded-sm">
                        <InputGroupAddon>
                            <AtSign className="size-4" />
                        </InputGroupAddon>
                        <InputGroupInput value={email} disabled />
                    </InputGroup>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="Email">Nama Depan</label>
                    <InputGroup className="px-2 py-6 border rounded-sm">
                        <InputGroupAddon>
                            <User className="size-4" />
                        </InputGroupAddon>
                        <InputGroupInput value={first_name} disabled />
                    </InputGroup>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="Email">Nama Belakang</label>
                    <InputGroup className="px-2 py-6 border rounded-sm">
                        <InputGroupAddon>
                            <User className="size-4" />
                        </InputGroupAddon>
                        <InputGroupInput value={last_name} disabled />
                    </InputGroup>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <Link to="/dashboard/update-profile" className="text-center cursor-pointer w-full border border-red-500 p-2 rounded-sm text-red-500 hover:bg-red-500 hover:text-white">Edit Profile</Link>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <button className="cursor-pointer w-full bg-red-500 p-2 rounded-sm text-white hover:bg-white hover:border hover:border-red-500 hover:text-red-500" onClick={() => handleLogout()}>Logout</button>
                </div>
            </div>
            <Toaster richColors position="top-right" />
        </section>
    )
}

export default ProfilePage
