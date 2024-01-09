import { CompetitionTabInterface, SeasonsListInterface } from "@/interfaces/FootballInterface"
import CompetitionHeader from "../Inlcudes/CompetitionSubHeader"
import GeneralModal from "@/components/Modals/GeneralModal"
import { useState } from "react"
import Composer from "@/utils/Composer"
import FormatDate from "@/utils/FormatDate"
import PredictionsStats from "../Inlcudes/PredictionsStats"
import Stats from "../Inlcudes/Stats"
import Str from "@/utils/Str"

interface Props extends CompetitionTabInterface, SeasonsListInterface { }

const Statistics: React.FC<Props> = ({ record, seasons, selectedSeason }) => {

    const competition = record
    if (!competition) return null

    const initialDates: Array<Date | string | undefined> = [FormatDate.YYYYMMDD(new Date()), undefined];
    const [fromToDates, setFromToDates] = useState<Array<Date | string | undefined>>(initialDates);
    const [useDate, setUseDates] = useState(false);

    return (
        <div>
            {
                competition
                &&
                <div>
                    <CompetitionHeader title="Statistics" actionTitle="Do Stats" actionButton="doStats" record={competition} seasons={seasons} selectedSeason={selectedSeason} fromToDates={fromToDates} setFromToDates={setFromToDates} setUseDates={setUseDates} />

                    <div className="card">
                        <div className="card-header">
                            <h6 className="d-flex gap-2 justify-content-between">
                                <div>
                                    <span>Stats for: </span>
                                    <span>{`${selectedSeason ? 'Season ' + Composer.season(selectedSeason) : fromToDates}`}</span>
                                </div>

                            </h6>
                        </div>
                        <div className="card-body">
                            <div key={selectedSeason?.id} className="row gap-4 gap-md-0">
                                <div className="col-md-6">
                                    <Stats competition={competition} selectedSeason={selectedSeason} fromToDates={fromToDates} useDate={useDate} />
                                </div>
                                <div className="col-md-6">
                                    <PredictionsStats competition={competition} selectedSeason={selectedSeason} fromToDates={fromToDates} useDate={useDate} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <GeneralModal title={`Predictions stats form`} actionUrl={`admin/competitions/view/${competition.id}/do-statistics`} size={'modal-lg'} id={`doStats`} >
                        <div className="form-group mb-3">
                            <label htmlFor="season_id">Selected season {
                                selectedSeason
                                &&
                                <span>
                                    {`${Str.before(selectedSeason.start_date, '-')} / ${Str.before(selectedSeason.end_date, '-')}`}
                                </span>
                            } </label>
                            <input type="hidden" name="season_id" key={selectedSeason?.id} value={selectedSeason?.id} />
                        </div>
                        <div className="modal-footer gap-1">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </GeneralModal>
                </div>
            }
        </div>
    )
}

export default Statistics