import banner from '../../assets/banner1.jpg'
function Banner() {
    return (
        <div className=''>
            <img src={banner} alt="Banner" className='relative w-full h-screen object-cover rounded-2xl' />
            <h1 className='absolute -bottom-16 left-1/4 w-1/2 text-white drop-shadow-xl text-6xl leading-tight font-bold font-banner text-center'>Gowheels - Cùng bạn trên mọi hành trình</h1>
        </div>
    );
}

export default Banner;