import { facebook, instagram, xsocial, youtube } from "../assets/icon/assets_icon"
import { solidDoubleRed } from "../assets/logo/assets_logo"

const footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_2fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img src={solidDoubleRed} alt="logo" className="mb-5 w-20" />
            <p className="w-full md:w-2/3 text-gray-600">
            Untuk Layanan Pengaduan Konsumen UNIQLO Indonesia (001) 80332160290 dan customersupport@uniqlo.co.id
            (Senin-Jumat 09.00-17.00)
            </p>
        </div>
        <div>
          <h1 className="text-xl font-medium my-5">Akun Sosial BILIQLO</h1>
          <div className="flex gap-2">
            <a href="https://www.facebook.com/UniqloIndonesiaOfficial" target="_blank" rel="noopener noreferrer">
              <img className="w-6" src={facebook} alt="Facebook" />
            </a>
            <a href="https://twitter.com/UNIQLOINDONESIA" target="_blank" rel="noopener noreferrer">
              <img className="w-6" src={xsocial} alt="X (formerly Twitter)" />
            </a>
            <a href="https://www.instagram.com/uniqloindonesia/" target="_blank" rel="noopener noreferrer">
              <img className="w-6" src={instagram} alt="Instagram" />
            </a>
            <a href="https://www.youtube.com/channel/UCcpMlHx9_rMO_3dsEZ506fw" target="_blank" rel="noopener noreferrer">
              <img className="w-6" src={youtube} alt="YouTube" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default footer
