const axios = require('axios')
const PushBullet = require('pushbullet')

const pusher = new PushBullet(process.env.PUSHBULLET_API_KEY)
const device_id = process.env.DEVICE_ID

async function searchNvidiaProduct(product) {
  
  try {
    const response = await axios.get(`https://api.nvidia.partners/edge/product/search?page=1&limit=9&locale=en-us&search=${encodeURIComponent(product)}`)

    if (response.status == 200) {

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

async function sendPushBulletNotification(device,product) {

  const noteUrl = `https://www.nvidia.com/en-us/geforce/graphics-cards/30-series/rtx-3080/`
  const note = `${product} is for sale!`

  pusher.link(device, product, noteUrl, note)
}

async function inStockNotification(product) {

  const stockStatus = await isGpuForSale(product)

  if (!stockStatus) {

    console.log(`GPU is not in stock :(`)
    return
  }

  console.log(`GPU is in stock! Sending notification`)

  sendPushBulletNotification(device_id,product)
}

inStockNotification(`RTX 3080`)

setInterval(function() {

  inStockNotification(`RTX 3080`)
}, 60000)