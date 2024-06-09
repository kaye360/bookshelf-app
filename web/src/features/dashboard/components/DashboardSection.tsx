import H2 from "../../../components/common/H2"

interface DashboardSectionProps {
    title: string
    children? : any
}

export default function DashboardSection({title, children} : DashboardSectionProps) {
    return (
        <section className="bg-bg-accent px-6 py-8 rounded-md overflow-auto">
            <H2>
                {title}
            </H2>
            
            <div className="grid grid-cols-[repeat(10,minmax(150px,1fr))] gap-4 ">
                {children}
            </div>
        </section>  
    )
}
