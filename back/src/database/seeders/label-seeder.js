import getDbInstance from '../index.js'

import { categoryList } from '#utils/constants.js'
import { tags } from '#database/schema/tags.js'

const labelArray = [
  {
    slug: "success",
    name: "Success Story",
    bgColor: "bg-green-600",
  },
  {
    slug: "confession",
    name: "Confession",
    bgColor: "bg-blue-500",
  },
  {
    slug: "struggle",
    name: "Struggles & Strength",
    bgColor: "bg-teal-500",
  },
  {
    slug: "reflection",
    name: "True Reflections",
    bgColor: "bg-purple-500",
  },
  {
    slug: "learning",
    name: "Learning Moments",
    bgColor: "bg-yellow-500",
  },
  {
    slug: "turningPoint",
    name: "Turning Point",
    bgColor: "bg-emerald-500",
  },
  {
    slug: "lettingGo",
    name: "Letting Go",
    bgColor: "bg-blue-400",
  },
  {
    slug: "vulnerability",
    name: "Vulnerability",
    bgColor: "bg-rose-500",
  },
  {
    slug: "temptation",
    name: "Overcoming Temptation",
    bgColor: "bg-purple-700",
  },
  {
    slug: "innerBattles",
    name: "Inner Battles",
    bgColor: "bg-gray-500",
  },
  {
    slug: "growth",
    name: "Growth in Progress",
    bgColor: "bg-green-400",
  },
  {
    slug: "silentStruggles",
    name: "Silent Struggles",
    bgColor: "bg-purple-400",
  },
  {
    slug: "breakingPatterns",
    name: "Breaking Patterns",
    bgColor: "bg-orange-500",
  },
  {
    slug: "clarity",
    name: "Finding Clarity",
    bgColor: "bg-sky-400",
  },
  {
    slug: "forgiveness",
    name: "Seeking Forgiveness",
    bgColor: "bg-pink-400",
  },
  {
    slug: "renewal",
    name: "Renewal & Hope",
    bgColor: "bg-green-300",
  },
  {
    slug: "pastShadows",
    name: "Past Shadows",
    bgColor: "bg-gray-700",
  },
  {
    slug: "selfAcceptance",
    name: "Accepting Myself",
    bgColor: "bg-beige-400",
  }
];

async function seed () {
  const db = await getDbInstance()

  try {
    await db.insert(tags).values(labelArray);

    console.log('Seed data inserted successfully!')
  } catch (error) {
    console.error('Error seeding data:', error)
  }
}

seed()
