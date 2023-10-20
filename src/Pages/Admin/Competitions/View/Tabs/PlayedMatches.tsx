import { CompetitionTabInterface } from '@/interfaces/CompetitionInterface'
import CompetitionHeader from '../Inlcudes/CompetitionHeader';
import AutoTable from '@/components/AutoTable';
import Str from '@/utils/Str';
import GeneralModal from '@/components/Modals/GeneralModal';
import AsyncSeasonsList from '../Inlcudes/AsyncSeasonsList';

const PlayedMatches: React.FC<CompetitionTabInterface> = ({ record, selectedSeason, setSelectedSeason, setKey }) => {

  const competition = record

  const columns = [
    { key: 'home_team.name' },
    { key: 'away_team.name' },
    { label: 'half_time', key: 'half_time' },
    { label: 'full_time', key: 'full_time' },
    { label: 'Status', key: 'Status' },
    { label: 'User', key: 'user_id' },
    { key: 'utc_date' },
    { label: 'Created At', key: 'Created_at' },
    { label: 'Action', key: 'action' },
  ]

  return (
    <div>
      {
        competition &&
        <div>
          <CompetitionHeader title="Played Matches" actionTitle="Fetch Results" actionButton="fetchPastMatches" record={competition} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} />

          <AutoTable key={selectedSeason?.id} columns={columns} baseUri={`admin/competitions/view/${competition.id}/matches?season=${Str.before(selectedSeason?.start_date, '-') || ''}&type=played`} search={true} tableId={'matchesTable'} customModalId="teamModal" />

          <GeneralModal title={`Fetch Results form`} actionUrl={`admin/competitions/view/${competition.id}/fetch-matches`} size={'modal-lg'} id={`fetchPastMatches`} setKey={setKey}>
            <div className="form-group mb-3">
              <label htmlFor="season_id">Season</label>
              <AsyncSeasonsList record={competition} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} />
            </div>
            <div className="form-group mb-3">
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

export default PlayedMatches