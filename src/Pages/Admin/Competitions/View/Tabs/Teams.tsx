import AutoTable from "@/components/AutoTable";
import GeneralModal from "@/components/Modals/GeneralModal";
import PageHeader from "@/components/PageHeader";
import useListSources from "@/hooks/apis/useListSources";
import { CollectionItemsInterface } from "@/interfaces/UncategorizedInterfaces";
import { subscribe, unsubscribe } from "@/utils/events";
import { useEffect, useState } from "react";
import AutoModalBody from "@/components/AutoModalBody";
import CreateOrUpdateFromSource from "@/components/CreateOrUpdateFromSource";
import AddSource from "@/components/AddSource";
import { CompetitionTabInterface } from "@/interfaces/FootballInterface";
import UpdateCoach from "@/components/Teams/UpdateCoach";

const Index: React.FC<CompetitionTabInterface> = ({ record, selectedSeason, setSelectedSeason, setKey }) => {

    const competition = record

    const [modelDetails, setModelDetails] = useState({})
    const [team, setTeam] = useState<CollectionItemsInterface>()
    const [record2, setRecord2] = useState<CollectionItemsInterface>()
    const [record3, setRecord3] = useState<CollectionItemsInterface>()

    const { competitions: list_sources } = useListSources()
    const [actionUrl, setActionUrl] = useState<string>('/admin/teams')

    const columns = [
        { key: 'Crest' },
        { label: 'Name', key: 'name' },
        { label: 'Short Name', key: 'short_name' },
        { label: 'TLA', key: 'tla' },
        { label: 'Country', key: 'country.name' },
        { label: 'Priority Number', key: 'priority_number' },
        { label: 'Last Updated', key: 'last_updated' },
        { label: 'Status', key: 'Status' },
        { label: 'User', key: 'user_id' },
        { label: 'Created At', key: 'Created_at' },
        { label: 'Action', key: 'action' },
    ];

    const addTeamSources = (e: CustomEvent) => {

        if (e.detail) {
            const detail = e.detail

            if (detail.classList.includes('autotable-modal-add-sources')) {
                setRecord2(detail)
            }
        }
    }
    useEffect(() => {

        subscribe('prepareModalAction', addTeamSources as EventListener)
        return () => unsubscribe('prepareModalAction', addTeamSources as EventListener)
    }, [modelDetails])

    useEffect(() => {
        if (record2)
            document.getElementById('addTeamSourceButton')?.click()

    }, [record2])


    const updateTeamCoach = (e: CustomEvent) => {

        if (e.detail) {
            const detail = e.detail

            if (detail.classList.includes('autotable-modal-update-coach')) {
                setRecord3(detail)
            }
        }
    }
    useEffect(() => {

        subscribe('prepareModalAction', updateTeamCoach as EventListener)
        return () => unsubscribe('prepareModalAction', updateTeamCoach as EventListener)
    }, [modelDetails])
    useEffect(() => {
        if (record3)
            document.getElementById('updateTeamCoachButton')?.click()

    }, [record3])


    const prepareEdit = async (event: CustomEvent<{ [key: string]: any }>) => {

        const detail = event?.detail
        if (detail && detail.modelDetails) {
            setModelDetails(detail.modelDetails)
            setTeam(detail.record)
            setActionUrl(detail.action)

        }

    }

    useEffect(() => {
        if (team) {
            document.getElementById("teamModalTrigger")?.click()
        }
    }, [team])

    useEffect(() => {

        // Add event listener for the custom ajaxPost event
        const prepareEventListener: EventListener = (event) => {
            const customEvent = event as CustomEvent<{ [key: string]: any }>;
            if (customEvent.detail) {
                prepareEdit(customEvent)
            }
        };

        subscribe('prepareEditCustom', prepareEventListener);

        // Cleaning the event listener when the component unmounts
        return () => {
            unsubscribe('prepareEditCustom', prepareEventListener);
        };
    }, []);

    function toggleEvent(e: Event) {
        const id = e.target?.id

        const form = document.querySelector('#teamModal form')
        if (form) {
            const manual = form.querySelector('.submit-button')
            const source = form.querySelector('.from-source-submit-button')
            const competitionOrigin = form.querySelector('input[name="team_origin"]') as HTMLInputElement | null;

            if (manual && source && competitionOrigin) {

                if (id === 'manual-tab') {
                    manual.setAttribute('type', 'submit')
                    source.setAttribute('type', 'button')
                    competitionOrigin.value = ('manual')
                } else if (id === 'from-source-tab') {
                    manual.setAttribute('type', 'button')
                    source.setAttribute('type', 'submit')
                    competitionOrigin.value = ('source')
                }
            }
        }

    }

    useEffect(() => {

        document.querySelector('#teamTabs')?.addEventListener('click', toggleEvent)

        return () => document.removeEventListener('click', toggleEvent)


    }, [])

    return (

        <div>
            <PageHeader title={'Teams list'} action="button" actionText="Create Team" actionTargetId="teamModal" permission='admin/teams' setRecord={setTeam} />
            <div>
                {
                    competition &&
                    <AutoTable columns={columns} baseUri={`admin/competitions/view/${competition.id}/teams/${selectedSeason?.id || ''}`} search={true} getModelDetails={setModelDetails} list_sources={list_sources} tableId={'teamsTable'} customModalId="teamModal" />
                }

            </div>
            {
                modelDetails &&
                <GeneralModal title={team ? 'Update Team' : `Create Team`} actionUrl={actionUrl} size={'modal-lg'} id={`teamModal`} setKey={setKey}>
                    <input type="hidden" name="team_origin" defaultValue={'manual'} />

                    <ul className="nav nav-tabs" id="teamTabs" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="manual-tab" data-bs-toggle="tab" data-bs-target="#manual" type="button" role="tab" aria-controls="manual" aria-selected="true">Manual</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="from-source-tab" data-bs-toggle="tab" data-bs-target="#from-source" type="button" role="tab" aria-controls="from-source" aria-selected="false">From source</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="teamTabsContent" key={team?.id}>
                        <div className="tab-pane fade show active" id="manual" role="tabpanel" aria-labelledby="manual-tab">
                            <div className="mt-4 pt-1 border-top">
                                <AutoModalBody modelDetails={modelDetails} list_sources={list_sources} record={team} setKey={setKey} />
                            </div>
                        </div>
                        <div className="tab-pane fade" id="from-source" role="tabpanel" aria-labelledby="from-source-tab">
                            <div className="mt-4 pt-1 border-top">
                                <CreateOrUpdateFromSource record={team} />
                            </div>
                        </div>
                    </div>
                </GeneralModal>
            }
            {
                record2 &&
                <>
                    <button type="button" className="btn btn-primary d-none" id="addTeamSourceButton" data-bs-toggle="modal" data-bs-target="#addTeamSource"></button>
                    <GeneralModal title={`Add source for ${record2.record.name || '#'}`} actionUrl={`${record2.action || '#'}`} size={'modal-lg'} id={`addTeamSource`} setKey={setKey}>
                        <AddSource key={record2.record.id} record={record2.record} />
                    </GeneralModal>
                </>
            }
            {
                record3 &&
                <>
                    <button type="button" className="btn btn-primary d-none" id="updateTeamCoachButton" data-bs-toggle="modal" data-bs-target="#updateTeamCoach"></button>
                    <GeneralModal title={`Update coach for ${record3.record.name || '#'}`} actionUrl={`${record3.action || '#'}`} size={'modal-md'} id={`updateTeamCoach`} setKey={setKey}>
                        <div>
                            <UpdateCoach record={record3} />
                        </div>
                    </GeneralModal>
                </>
            }

        </div>
    );
}

export default Index;
