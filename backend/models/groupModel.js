import mongoose from "mongoose";

const startEndDateTimesSchema = new mongoose.Schema({
  startDatetime: {
    type: Date,
    required: true,
  },
  endDatetime: {
    type: Date,
    required: true,
  },
});

const AnnouncementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ScoreSchema = new mongoose.Schema({
  team1Set: {
    type: Number,
  },
  team2Set: {
    type: Number,
  },
  team1Score: {
    type: Number,
  },
  team2Score: {
    type: Number,
  },
});

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  membershipStatus: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
    required: true,
  },
});

const MatchSchema = new mongoose.Schema({
  matchId: {
    type: String,
    required: true,
  },
  team1Id: {
    type: String, // change to mongoose.Schema.Types.ObjectId
    required: true,
  },
  team2Id: {
    type: String, // change to mongoose.Schema.Types.ObjectId
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  bestOf: {
    type: Number,
    default: 3,
  },
  courtNum: {
    type: Number,
  },
  status: {
    type: String,
    required: true,
  },
  matchTimes: {
    type: startEndDateTimesSchema,
  },
  score: {
    type: ScoreSchema,
  },
  winner: {
    type: String,
    required: true,
  },
});

const scoreboardSchema = new mongoose.Schema({
  matchId: {
    type: String,
    default: "N/A",
  },
  isDone: {
    type: Boolean,
    required: true,
  },
  team1Id: {
    type: String, // change to mongoose.Schema.Types.ObjectId
  },
  team2Id: {
    type: String, // change to mongoose.Schema.Types.ObjectId
  },
  score: {
    type: ScoreSchema,
  },
  changeCourt: {
    type: Boolean,
    default: false,
  },
  serve: {
    type: Number,
    default: 1,
  },
  isFullScreen: {
    type: Boolean,
    default: false,
  },
  monitorId: {
    type: String,
  },
});

const EventPlayerTeamSchema = new mongoose.Schema({
  gamesPlayed: {
    type: Number,
    required: true,
  },
  lastTimePlayed: {
    type: Date,
    default: Date.now,
  },
  noOfWins: {
    type: Number,
    required: true,
  },
  subgroups: {
    type: [
      {
        type: String,
      },
    ],
    required: true,
  },
  teamPlayers: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
  },
});

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: [startEndDateTimesSchema],
    default: []
  },
  venue: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    required: true,
  },
  playerTeams: {
    type: [EventPlayerTeamSchema],
    default: [],
  },
  matches: {
    type: [MatchSchema],
    default: [],
  },
  description: {
    type: String,
    required: true,
  },
  scoreboards: {
    type: [scoreboardSchema],
    default: [],
  },
});

// const TagSchema = new mongoose.Schema({
//   tag: {
//     type: String,
//     required: true,
//   },
// });

const GroupSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    announcements: {
      type: [AnnouncementSchema],
      default: [],
    },
    events: {
      type: [EventSchema],
      default: [],
    },
    players: {
      type: [PlayerSchema],
      default: [],
    },
    description: {
      type: String,
    },
    tags: {
      type: [
        {
          type: String,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", GroupSchema);

export { Group as GroupModel };
