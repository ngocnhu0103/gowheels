import Card from '../components/Card'

function BikeFavs() {
    return (
        <div>
            <h1 className='text-center text-3xl font-banner text-primary pb-5'>Xe yêu thích</h1>
            <ul className='w-full grid grid-cols-1 gap-5'>
                <Card isRow={true} />
                <Card isRow={true} />
                <Card isRow={true} />
                <Card isRow={true} />


            </ul>
        </div>
    )
}

export default BikeFavs