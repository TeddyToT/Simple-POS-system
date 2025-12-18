import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useInfiniteOrders } from "@/api/endpoints/order"
import { formatVND } from "@/utils/formatVND"
import { OrderDetailDialog } from "./components"
import type { Order } from "@/api/types/order"

const OrderTable = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteOrders()

  const orders = data?.pages.flatMap(p => p.data) ?? []

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [open, setOpen] = useState(false)

  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order)
    setOpen(true)
  }

  if (isLoading) {
    return <p className="text-muted-foreground">Đang tải đơn hàng...</p>
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã đơn</TableHead>
            <TableHead>Tổng tiền</TableHead>
            <TableHead>Thời gian</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.orderId}>
              <TableCell className="font-medium">
                {order.orderId}
              </TableCell>

              <TableCell>
                {formatVND(order.totalAmount)} VNĐ
              </TableCell>

              <TableCell>
                {new Date(order.createdAt).toLocaleString("vi-VN")}
              </TableCell>

              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleViewDetail(order)}
                >
                  Chi tiết
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {hasNextPage && (
        <div className="flex justify-center mt-4">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant="secondary"
          >
            {isFetchingNextPage ? "Đang tải..." : "Tải thêm"}
          </Button>
        </div>
      )}

      {/* Dialog */}
      <OrderDetailDialog
        open={open}
        onOpenChange={setOpen}
        order={selectedOrder}
      />
    </>
  )
}

export default OrderTable
