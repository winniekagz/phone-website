
import { appleImg, bagImg, searchImg } from '../utils'

function Navbar() {
    const navItems=['Home','Features','Tech specs', 'support' ]
  return (
    <header className='  w-full py-5 sm:px-10 px-5 flex justify-between items-center'>
        <nav className='flex flex-row justify-between items-center w-full max-w-[1120px]'>
            <img src={appleImg} alt="logo" width={14} height={15} className='image-contain' />

            <div className="flex gap-3">
              {navItems.map((navItem)=>(
                <div key={navItem} className="hover:text-secondary hover:text-underline
                cursor-pointer transition-all ">{navItem}</div>
              ))}
            </div>
            <div className="flex gap-7 items-baseline max-sm:justify-end max-sm:flex-1">
                <img src={searchImg} alt="searchImage" width={14} height={14} className='object-contain' />
                <img src={bagImg} alt="bag" width={14} height={14} className='object-contain' />
            </div>
        </nav>
    </header>
  )
}

export default Navbar