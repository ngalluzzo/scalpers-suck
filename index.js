const axios = require('axios')

async function searchNvidiaProduct(product) {
  
  try {
    const response = await axios.get(`https://api.nvidia.partners/edge/product/search?page=1&limit=9&locale=en-us&search=${encodeURIComponent(product)}`)

    if (response.status = 200) {

      return response.data
    }

  } catch(error) {
    
    throw new Error(error)
  }
  
}

async function isGpuForSale(product) {

  const GpuSearch = await searchNvidiaProduct(product)

  const GpuDetails = GpuSearch.searchedProducts.productDetails[0]

  if (GpuDetails.prdStatus !== `gf_notify_me`) {

    return false
  }

  return true
}