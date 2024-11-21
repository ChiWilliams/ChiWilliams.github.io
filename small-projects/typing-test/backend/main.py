from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
# from 

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LeaderboardEntry(BaseModel):
    name: str
    time: int

leaderboard: list[LeaderboardEntry] = [
    LeaderboardEntry(name='saleh', time=15),
    LeaderboardEntry(name='john', time=16)
    ]

@app.get("/get_high_scores")
async def get_high_score() -> list[LeaderboardEntry]:
    # fetch from db
    return sorted(leaderboard, key=lambda entry: entry.time)

@app.put("/set_new_score", status_code=204)
async def set_new_score(score: LeaderboardEntry) -> None:
    print(score)

    if not score.name:
        raise HTTPException(status_code=400, detail = "Name cannot be empty")
    if 0 >= score.time:
        raise HTTPException(status_code=400, detail="Time must be positive")
    
    leaderboard.append(score)
    # commit to db

@app.delete("/admin/reset_scores", status_code=204)
async def reset_scores() -> None:
    leaderboard.clear()
    # clear db