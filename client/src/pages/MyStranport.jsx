import Card from "../components/Card"

function MyStranport() {
    return (
        <div>
            <h1 className='text-center text-3xl font-banner text-primary pb-5'>Xe của tôi</h1>
            <ul className='w-full grid grid-cols-1 gap-5'>
                <Card isRow={true} isManage={true} />
                <Card isRow={true} />
                <Card isRow={true} />
                <Card isRow={true} />

            </ul>
        </div>

    )
}

export default MyStranport