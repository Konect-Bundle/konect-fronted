export default function AuthLayout({
                                            children, // will be a page or nested layout
                                        }: {
    children: React.ReactNode
}) {
    return (
        <section className="h-screen w-screen grid md:grid-cols-2 grid-cols-1">
           <div className="flex justify-center items-center">
               {children}
           </div>
            <div className="h-full bg-black-light md:block hidden">

            </div>
        </section>
    )
}