import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatVND } from "@/utils/formatVND"
import type { Order } from "@/api/types/order"

interface OrderDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: Order | null
}

const OrderDetailDialog = ({
  open,
  onOpenChange,
  order,
}: OrderDetailDialogProps) => {
  if (!order) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Chi tiết đơn hàng</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <p><b>Mã đơn:</b> {order.orderId}</p>
          <p><b>Thời gian:</b> {new Date(order.createdAt).toLocaleString("vi-VN")}</p>
          <p className="break-all"><b>Tổng tiền:</b> {formatVND(order.totalAmount)} VNĐ</p>
          <p><b>Số sản phẩm:</b> {order.items.reduce((total, item) => total + item.quantity, 0)}</p>
        </div>

        <Separator />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Sản phẩm</TableHead>
              <TableHead className="text-center">Số lượng</TableHead>
              <TableHead className="text-right">Đơn giá (VNĐ)</TableHead>
              <TableHead className="text-right">Thành tiền (VNĐ)</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {order.items.map((item) => (
              <TableRow key={item.productId}>
                <TableCell>{item.productName}</TableCell>
                <TableCell className="text-center">
                  {item.quantity}
                </TableCell>
                <TableCell className="text-right">
                  {formatVND(item.unitPrice)}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatVND(item.unitPrice * item.quantity)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}

export default OrderDetailDialog
