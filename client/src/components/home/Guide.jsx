
function Guide() {
    return (
        <div className='my-8'>
            <div className='text-center'><h1 className='text-4xl font-bold font-banner text-primary'>Hướng dẫn thuê xe</h1>
                <p className='text-xl font-semibold'>Chỉ với 4 bước đơn giản để có thể trải nghiệm dịch vụ thuê xe tại GoWheels</p></div>
            <ul className='flex mt-10 justify-evenly'>
                <li className='w-1/5 text-center border border-primary rounded-lg p-5'>
                    <p className=' text-primary text-xl font-semibold'>01</p>
                    <span>Truy cập ứng dụng, đặt xe</span>
                </li>
                <li className='w-1/5 text-center border border-primary rounded-lg p-5'>
                    <p className=' text-primary text-xl font-semibold'>02</p>
                    <span>Chọn hình thức nhận xe, nhận xe</span>
                </li>
                <li className='w-1/5 text-center border border-primary rounded-lg p-5'>
                    <p className=' text-primary text-xl font-semibold'>03</p>
                    <span>Bắt đầu hành trình thú vị</span>
                </li>
                <li className='w-1/5 text-center border border-primary rounded-lg p-5'>
                    <p className=' text-primary text-xl font-semibold'>04</p>
                    <span >Trả xe kết thúc chuyến đi và thanh toán</span>
                </li>
            </ul>
        </div>
    )
}

export default Guide