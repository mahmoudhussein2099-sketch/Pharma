import { products, getProductsByCategory } from '../../src/data/products'

export default function handler(req, res) {
  const { method, query } = req
  
  switch (method) {
    case 'GET':
      try {
        const { category, subcategory, search, limit } = query
        
        let filteredProducts = products
        
        // Filter by category
        if (category) {
          filteredProducts = getProductsByCategory(category, subcategory)
        }
        
        // Search functionality
        if (search) {
          filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase())
          )
        }
        
        // Limit results
        if (limit) {
          filteredProducts = filteredProducts.slice(0, parseInt(limit))
        }
        
        res.status(200).json({
          success: true,
          count: filteredProducts.length,
          data: filteredProducts
        })
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Server Error'
        })
      }
      break
      
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).json({
        success: false,
        message: `Method ${method} not allowed`
      })
  }
}