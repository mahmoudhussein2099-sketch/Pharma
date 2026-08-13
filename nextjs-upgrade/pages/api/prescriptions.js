export default function handler(req, res) {
  const { method } = req
  
  switch (method) {
    case 'POST':
      try {
        const { name, phone, email, deliveryOption, address, notes } = req.body
        
        // Validate required fields
        if (!name || !phone || !email) {
          return res.status(400).json({
            success: false,
            message: 'Name, phone, and email are required'
          })
        }
        
        // In a real app, save to database
        const prescription = {
          id: Date.now(),
          name,
          phone,
          email,
          deliveryOption,
          address,
          notes,
          status: 'pending',
          createdAt: new Date().toISOString()
        }
        
        // Send confirmation email (mock)
        console.log('Prescription submitted:', prescription)
        
        res.status(201).json({
          success: true,
          message: 'Prescription submitted successfully',
          data: prescription
        })
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Server Error'
        })
      }
      break
      
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).json({
        success: false,
        message: `Method ${method} not allowed`
      })
  }
}