const { FootballBlog } = require("@bikashrajkhowa-i12/blackboxcore").Mongo;
const { mongoInsert } = require("../../db/helper");

const insertBlog = async (conn, collection, schema) => {
  try {
    const {
      status = null,
      inserted = 0,
      duplicate = 0,
    } = await mongoInsert({
      conn,
      collection,
      schema,
      data: insertObj,
      duplicationCheck: ["_id", "blog_id", "title"],
    });
    console.log("status: ", status);
    console.log("inserted: ", inserted);
    console.log("duplicate: ", duplicate);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const insertObj = {
  title:
    "When Talent Travels: Bundesliga Stars Who Flopped in the Premier League",
  slug: "bundesliga-stars-flopped-premier-league",
  category: "transfer-news",
  teams: [],
  location: "England / Germany",
  league: [{ type: "Premier League" }],
  stadium: "",
  tags: ["transfers", "bundesliga", "premier_league", "football_flops"],
  content_type: "markdown",
  content: {
    summary:
      "Not every big move pays off. While the Bundesliga has long been a talent factory, several of its top exports failed to replicate their form after crossing over to England. From misplaced roles to poor tactical fits, these transfers show how tricky transitions can be.",

    bundesliga_to_premier_league_flops:
      "Timo Werner lit up Germany with RB Leipzig but failed to reach those heights at Chelsea, despite winning the Champions League. His finishing woes and lack of confidence stood out. Shinji Kagawa, brilliant under Klopp at Dortmund, never found his rhythm at Manchester United. Sebastian Haller, dominant at Eintracht Frankfurt, looked lost at West Ham before bouncing back elsewhere. Even Joëlinton struggled at Newcastle as a striker before being redefined as a midfielder.",

    factors_behind_the_downfall:
      "Several patterns emerge: tactical mismatches, positional confusion, and the Premier League’s physicality all played a role. Havertz and Sancho, both technically gifted, found themselves shuffling positions under managers unsure of how to best use them. Injuries also held back players like Pulisic and Keita, who showed flashes but couldn’t stay consistent. Meanwhile, success stories like De Bruyne or Haaland thrived because they landed in systems that maximized their strengths.",

    lessons_for_future_transfers:
      "The takeaway is clear: pedigree alone isn’t enough. Scouting departments must go beyond highlight reels and consider fit, role clarity, and mental resilience. With more Bundesliga stars likely to cross the channel, clubs would be wise to study both the flops and the few who flourished.",
  },
  sources: [
    {
      name: "PlanetSport",
      url: "https://www.planetsport.com/soccer/news/10-bundesliga-players-who-flopped-premier-league-8-who-were-quite-good",
    },
    {
      name: "OneFootball",
      url: "https://onefootball.com/en/news/the-biggest-bundesliga-flops-to-arrive-in-the-premier-league-ft-sancho-werner-havertz-38162973",
    },
    {
      name: "Goal.com",
      url: "https://www.goal.com/en-in/lists/de-bruyne-schweinsteiger-hits-flops-bundesliga-premier-league/blt8880b50d795b779b",
    },
  ],
};

module.exports = {
  insertBlog,
};
