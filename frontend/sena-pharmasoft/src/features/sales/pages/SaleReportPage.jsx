
import {SellColumns}  from "@/features/sales"
import { ventas } from "@/data/sells/sells"
import { DataTable } from "../../../shared/components"

export default function SaleReportPage(){


    return (
                                <div className="w-full h-200 ">
                            <DataTable
                                data={ventas}
                                columns={SellColumns}
                            />

                        </div>
    )
}
