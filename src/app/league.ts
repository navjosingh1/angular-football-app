export const leagues = {
    "get": "leagues",
    "parameters": {
        "code": "GB",
        "season": "2023",
        "name": "Premier League"
    },
    "errors": [],
    "results": 2,
    "paging": {
        "current": 1,
        "total": 1
    },
    "response": [
        {
            "league": {
                "id": 39,
                "name": "Premier League",
                "type": "League",
                "logo": "https:\/\/media-4.api-sports.io\/football\/leagues\/39.png"
            },
            "country": {
                "name": "England",
                "code": "GB",
                "flag": "https:\/\/media-4.api-sports.io\/flags\/gb.svg"
            },
            "seasons": [
                {
                    "year": 2023,
                    "start": "2023-08-11",
                    "end": "2024-05-19",
                    "current": true,
                    "coverage": {
                        "fixtures": {
                            "events": true,
                            "lineups": true,
                            "statistics_fixtures": true,
                            "statistics_players": true
                        },
                        "standings": true,
                        "players": true,
                        "top_scorers": true,
                        "top_assists": true,
                        "top_cards": true,
                        "injuries": true,
                        "predictions": true,
                        "odds": true
                    }
                }
            ]
        }
    ]
}