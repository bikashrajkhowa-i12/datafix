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
  title: "Amorim Sets Ambitious 20‑Year Vision at Manchester United",
  slug: "amorim-20-year-united-stay-vision",
  category: "club-update",
  teams: ["Manchester United"],
  location: "Manchester, England",
  published_date: new Date("2025-08-03 18:58:23"),
  published: true,
  league: ["Premier League"],
  stadium: "Old Trafford",
  tags: [
    "Amorim",
    "Manchester United",
    "long‑term plan",
    "managerial ambition",
  ],
  content_type: "plain",
  preview:
    "In a bold declaration during United’s 2025 pre‑season tour, manager Rúben Amorim laid out his ambition to remain at Manchester United for the next two decades. Fresh off a tumultuous first season marred by the club’s worst Premier League finish in over 50 years, Amorim insists he’s ready to reset and build a lasting legacy. With backing from co-owner Sir Jim Ratcliffe and a new culture taking root under his leadership, Amorim aims to recreate the long-term success that defined the Ferguson era. But fans and the board will judge based on results—and quickly.",
  content: {
    summary:
      "Rúben Amorim has openly declared his goal to lead Manchester United for the next 20 years—a bold ambition for a club that has rarely offered managerial stability since Sir Alex Ferguson. Despite overseeing a disastrous debut campaign in which United finished 15th, Amorim says he has “used up all the credits” and is now ready to restart his project. With fresh recruits, a cultural overhaul, and personal commitment, he sees himself following in Ferguson’s footsteps—but he’s clear that results will ultimately determine his longevity.",

    long_term_commitment:
      "In an interview during United’s U.S. pre‑season tour, Amorim said calmly: “I want to stay. I want to stay 20 [years]. That is my goal and I truly believe in that.” He explained that, while many view the statement as overly ambitious, he feels Manchester United’s history, fanbase, and financial resources give him a platform for long-term success. Having waited five years to join United, he says failure isn’t an option.",

    tactical_and_cultural_reset:
      "Amorim has shifted United’s tone dramatically. He has implemented a disciplined structure, sidelining players who he felt didn’t fit his vision and promoting a leadership group centered on Bruno Fernandes, Luke Shaw, and others. He introduced positional overloads and a flexible 3‑4‑2‑1 system, prioritizing possession, accountability, and emotional maturity. United’s worst-ever finish prompted him to take a firm stand; now, with signings like Bryan Mbeumo and Matheus Cunha, he looks to translate summer optimism into results.",

    support_and_scrutiny:
      "Co‑owner Sir Jim Ratcliffe has publicly endorsed Amorim’s long‑term appointment, calling him “outstanding” and saying he expects him to stay at United “for a long time.” But the pressure is relentless—supporters, pundits, and the board expect tangible improvement after a campaign of embarrassment. Amorim has even publicly apologized to fans and urged unity after United’s 15th‑place finish and Europa League final loss.",

    final_thought:
      "The ambition is clear: Amorim wants to be remembered alongside United greats who defined club identity for decades. Yet in modern football, results are non‑negotiable. Can Amorim turn culture into silverware quickly enough to earn the years he seeks? The 2025‑26 campaign will be the true test of whether he’s laying groundwork for legacy—or running out of credits.",
  },
  sources: [
    {
      ESPN: "https://www.espn.com/soccer/story/_/id/45889899/ruben-amorim-wants-20-year-man-united-stay-my-goal",
    },
    {
      "Sky Sports":
        "https://www.skysports.com/football/news/11095/13406202/ruben-amorim-manchester-united-head-coach-reveals-he-wants-to-stay-at-old-trafford-for-next-20-years",
    },
    {
      "The Guardian":
        "https://www.theguardian.com/football/2025/jul/31/amorim-offers-rasmus-hojlund-no-guarantees-over-manchester-united-future",
    },
    {
      ESPN: "https://www.espn.com/soccer/story/_/id/45857008/luke-shaw-ruben-amorim-manchester-united-preseason-tour",
    },
    {
      Reuters:
        "https://www.reuters.com/sports/soccer/manchester-united-name-portuguese-amorim-head-coach-2024-11-01/",
    },
  ],
};

module.exports = {
  insertBlog,
};
