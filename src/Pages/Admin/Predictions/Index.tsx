import Error404 from '@/Pages/ErrorPages/Error404';
import AutoTable from '@/components/AutoTable';
import useListSources from '@/hooks/apis/useListSources';
import useRouteParamValidation from '@/hooks/useRouteParamValidation';
import "react-datepicker/dist/react-datepicker.css";
import { predictionsColumns } from '@/utils/constants';
import MatchesPageHeader from '@/components/Matches/MatchesPageHeader';
import useFromToDates from '@/hooks/useFromToDates';

const Index = () => {

    const { competitions: list_sources } = useListSources()

    const errorsState = useRouteParamValidation();
    const { fromToDates, setFromToDates, baseUri, previousUrl } = useFromToDates(`/admin/predictions/`);

    return (
        <div>
            {
                errorsState === 0 ?
                    <div>
                        <MatchesPageHeader title={'Predictions List'} fromToDates={fromToDates} setFromToDates={setFromToDates} />
                        <AutoTable
                            key={baseUri}
                            baseUri={baseUri}
                            columns={predictionsColumns}
                            search={true}
                            list_sources={list_sources}
                            perPage={200}
                        />
                    </div>
                    :
                    <div>
                        {
                            errorsState === 2
                            &&
                            <Error404 previousUrl={previousUrl} currentUrl={location.pathname} />
                        }
                    </div>
            }
        </div>
    );
};

export default Index;

