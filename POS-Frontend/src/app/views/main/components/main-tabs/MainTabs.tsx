import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useNavigate, useLocation } from 'react-router-dom'

const MainTabs = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const value = pathname.includes('/don-hang') ? 'orders' : 'products'

  return (
    <Tabs value={value} className="w-full my-3">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="products" onClick={() => navigate('/san-pham')}>
          Màn hình POS
        </TabsTrigger>
        <TabsTrigger value="orders" onClick={() => navigate('/don-hang')}>
          Màn hình đơn hàng
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export default MainTabs
