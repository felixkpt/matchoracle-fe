import AutoModal from "@/components/AutoModal";
import AutoTable from "@/components/AutoTable";
import PageHeader from "@/components/PageHeader";
import { useState } from "react";

interface CountryInterface {
    id: string,
    name: string,
    slug: string,
    continents: []

}

const Index = () => {

    const [modelDetails, setModelDetails] = useState({})

    const columns = [
        {
            label: 'Name',
            key: 'name',
        },
        {
            label: 'Slug',
            key: 'slug',
        },
        {
            label: 'Code',
            key: 'code',
        },
        {
            label: 'image',
            key: 'image',
        },
        {
            label: 'Priority NO',
            key: 'priority_number',
        },
        {
            label: 'Status',
            key: 'Status',
        },
        {
            label: 'Action',
            key: 'action',
        },
    ];

    return (
        <div>
            <PageHeader title={'Continents list'} action="button" actionText="Create Continent" actionTargetId="AutoModal" permission='admin/continents' />
            <div>
                <AutoTable columns={columns} baseUri={'admin/continents'} search={true} getModelDetails={setModelDetails} />
            </div>
            {
                modelDetails && <><AutoModal modelDetails={modelDetails} actionUrl='/admin/continents' /></>
            }
        </div>
    );
};

export default Index;
