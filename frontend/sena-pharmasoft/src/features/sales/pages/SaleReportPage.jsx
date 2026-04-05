
import {SellColumns}  from "@/features/sales"
import { DataTable } from "../../../shared/components"

export default function SaleReportPage({data}){


    return (
                                <div className="w-full h-200 ">
                            <DataTable
                                data={data}
                                columns={SellColumns}
                            />

                        </div>
    )
}
