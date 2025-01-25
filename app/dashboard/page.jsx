import SideMenu from "../_components/SideMenu"

export default function Dashboard() {
    
    let devices = [
        {
            "Name": "Device1"
        }
    ]

    return (
        <div className="flex h-screen">

            <SideMenu devices={devices} />
            {console.log(devices) }

            {/* Main Content */}
            <div className="flex-1 bg-base-100 p-4 overflow-y-auto">
                {Array.from({ length: 50 }).map((_, index) => (
                    <div key={index} className="mb-4">
                        <h1 className="text-xl font-bold">Main Content Section {index + 1}</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                            sollicitudin sapien nec turpis hendrerit fermentum. Duis fringilla
                            volutpat lectus, sit amet fermentum lectus eleifend et. Vestibulum
                            in magna non nulla gravida luctus non sed metus.
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}