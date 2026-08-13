import ProductDetailPage from '../../src/pages/user/ProductDetailPage'
import { useRouter } from 'next/router'

export default function ProductDetail() {
  const router = useRouter()
  const { id } = router.query
  
  return <ProductDetailPage productId={id} />
}
