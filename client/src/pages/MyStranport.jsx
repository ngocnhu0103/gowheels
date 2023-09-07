import Card from "../components/Card";

function MyStranport() {
    return (
        <div>
            <h1 className="text-3xl font-banner text-primary pb-5">Xe của tôi</h1>
            <ul className="w-full grid grid-cols-1 gap-5 relative max-h-[70vh] overflow-auto snap-y snap-mandatory">
                <Card isRow={true} isManage={true} />
                <Card isRow={true} />
                <Card isRow={true} />
                <Card isRow={true} />
            </ul>
        </div>
    );
}

export default MyStranport;
