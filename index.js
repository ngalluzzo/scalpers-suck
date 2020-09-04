const axios = require('axios')
const PushBullet = require('pushbullet')

const pusher = new PushBullet(process.env.PUSHBULLET_API_KEY)
const device_id = process.env.DEVICE_ID

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

  if (GpuDetails.prdStatus !== `buy_now`) {

    return false
  }

  return true
}

async function sendPushBulletNotification(product) {

  pusher.link(`ujyjz1ykpI4sjAuXDo0g56`, product, `https://www.nvidia.com/en-us/geforce/graphics-cards/30-series/rtx-3080/`, `${product} is for sale!`)
}