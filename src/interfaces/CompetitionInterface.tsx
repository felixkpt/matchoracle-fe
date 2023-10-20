export interface CountryInterface {
    id: string;
    name: string;
    slug: string;
    code?: string | null;
    dial_code?: string | null;
    flag?: string | null;
    continent_id: string;
    has_competitions: boolean;
    competitions: CompetitionInterface[];
    priority_number: number;
    status_id: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}

export interface TeamInterface {
    id: string;
    name: string;
    slug: string;
    short_name: string;
    tla: string;
    crest: string;
    address_id: string | null;
    website: string | null;
    founded: string | null;
    club_colors: string | null;
    venue_id: string | null;
    coach_id: string | null;
    coach_contract: any;
    competition_id: string;
    competitions: CompetitionInterface[];
    continent_id: string;
    country_id: string | null;
    priority_number: number;
    last_updated: string | null;
    last_fetch: string | null;
    last_detailed_fetch: string | null;
    status_id: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}

export interface StandingTableInterface {
    id: string;
    season_id: string;
    standing_id: string;
    team_id: string;
    position: number;
    played_games: number;
    form: string | null;
    won: number;
    draw: number;
    lost: number;
    points: number;
    goals_for: number;
    goals_against: number;
    goal_difference: number;
    status_id: string;
    user_id: string;
    created_at: string;
    updated_at: string;
    team: TeamInterface;
}

export interface StandingInterface {
    id: string;
    competition_id: string;
    season_id: string;
    stage: string;
    type: string;
    group: string | null;
    status_id: string;
    user_id: string;
    created_at: string;
    updated_at: string;
    standing_table: StandingTableInterface[];
}

export interface SeasonInterface {
    id: string;
    competition_id: string;
    start_date: string;
    end_date: string;
    is_current: number;
    current_matchday: number | null;
    total_matchdays: number | null;
    winner_id: string | null;
    stages: any[]; // Define the structure based on your data
    status_id: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}

export interface CompetitionInterface {
    id: string;
    name: string;
    slug: string;
    code: string;
    type: string;
    emblem: string | null;
    plan: string | null;
    abbreviation: string | null;
    has_teams: boolean | null;
    continent_id: string;
    country_id: string | null;
    country: CountryInterface;
    priority_number: number;
    last_updated: string;
    last_fetch: string | null;
    last_detailed_fetch: string | null;
    image: string | null;
    stage_id: string;
    status_id: string;
    user_id: string;
    created_at: string;
    updated_at: string;
    standings: StandingInterface[];
    seasons: SeasonInterface[];
}

export interface CompetitionTabInterface {
    record: CompetitionInterface | undefined;
    selectedSeason: SeasonInterface | null
    setSelectedSeason: React.Dispatch<React.SetStateAction<SeasonInterface | null>>;
    setKey?: React.Dispatch<React.SetStateAction<number>>;
}