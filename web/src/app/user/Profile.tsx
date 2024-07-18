import { useParams } from "react-router-dom";
import BaseLayout from "../../layouts/BaseLayout";
import H1 from "../../components/common/H1";

export default function Profile() {

    const params = useParams()

    
    return (
        <BaseLayout>
            <H1>
                {params.handle}
            </H1>
        </BaseLayout>
    )
} 