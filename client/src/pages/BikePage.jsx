import { useSearchParams } from "react-router-dom";
function BikePage() {
    let [searchParams, setSearchParams] = useSearchParams();

    console.log(searchParams.get('category'));
    return (
        <h1>h1</h1>
    );
}

export default BikePage;