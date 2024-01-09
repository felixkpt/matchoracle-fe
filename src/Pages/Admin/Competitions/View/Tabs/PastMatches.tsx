import { CompetitionTabInterface, SeasonInterface, SeasonsListInterface } from '@/interfaces/FootballInterface'
import CompetitionHeader from '../Inlcudes/CompetitionSubHeader';
import AutoTable from '@/components/AutoTable';
import GeneralModal from '@/components/Modals/GeneralModal';
import AsyncSeasonsList from '../Inlcudes/AsyncSeasonsList';
import { useEffect, useState } from 'react';
import FormatDate from '@/utils/FormatDate';
import { appendFromToDates, baseURL } from '@/utils/helpers';
import Str from '@/utils/Str';

interface Props extends CompetitionTabInterface, SeasonsListInterface { }

const PastMatches: React.FC<Props> = ({ record, seasons, selectedSeason }) => {

  const competition = record

  const initialDates: Array<Date | string | undefined> = [FormatDate.YYYYMMDD(new Date()), undefined];
  const [fromToDates, setFromToDates] = useState<Array<Date | string | undefined>>(initialDates);
  const [useDate, setUseDates] = useState(false);


  const columns = [
    { key: 'ID' },
    { key: 'home_team.name' },
    { key: 'away_team.name' },
    { label: 'half_time', key: 'half_time' },
    { label: 'full_time', key: 'full_time' },
    { label: 'Status', key: 'Status' },
    { key: 'Created_by' },
    { key: 'utc_date' },
    { label: 'Last Fetch', key: 'Last_fetch' },
    { label: 'Action', key: 'action' },
  ]

  const [baseUri, setBaseUri] = useState('')

  useEffect(() => {

    if (competition) {
      let uri = `admin/competitions/view/${competition.id}/matches?type=past`
      if (useDate) {
        uri = uri + `${appendFromToDates(useDate, fromToDates)}`
      } else {
        uri = uri + `&season_id=${selectedSeason ? selectedSeason?.id : ''}`
      }
      setBaseUri(uri)
    }
  }, [competition, fromToDates])

  return (
    <div>
      {
        competition &&
        <div>
          <CompetitionHeader title="Past Matches" actionTitle="Fetch Results" actionButton="fetchPastMatches" record={competition} seasons={seasons} selectedSeason={selectedSeason} fromToDates={fromToDates} setFromToDates={setFromToDates} setUseDates={setUseDates} />

          {baseUri &&
            <AutoTable key={baseUri} columns={columns} baseUri={baseUri} search={true} tableId={'matchesTable'} customModalId="teamModal" />
          }

          <GeneralModal title={`Fetch Results form`} actionUrl={`admin/competitions/view/${competition.id}/fetch-matches`} size={'modal-lg'} id={`fetchPastMatches`}>
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
            <div className={`form-group mb-3${selectedSeason ? (!!selectedSeason.is_current ? '' : ' d-none ') : ''}`}>
              <div className="form-check">
                <input
                  key={selectedSeason ? selectedSeason.id : ''}
                  className="form-check-input"
                  id='shallow_fetch'
                  type='checkbox'
                  name={`shallow_fetch`}
                  defaultChecked={selectedSeason ? !!selectedSeason.is_current : false}
                />
                <label className="form-check-label" htmlFor={`shallow_fetch`}>
                  Shallow fetch
                </label>
              </div>
            </div>
            <div className="form-group mb-3 d-none">
              <label htmlFor="matchday">Match day</label>
              <input type="number" min={0} max={200} name='matchday' id='matchday' className='form-control' />
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

export default PastMatches