import DataTable from "@/shared/components/DataTable"
import {SellColumns}  from "@/features/sales"
import { ventas } from "@/data/sells/sells"

export default function ListSellPage() {

  return (
    <div className="p-6">
      <DataTable
        data={ventas}
        columns={SellColumns}
      />

    </div>
  )
}

