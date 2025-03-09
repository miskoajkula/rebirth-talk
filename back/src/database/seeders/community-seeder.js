import getDbInstance from '../index.js'

import { focusCommunities } from "#database/schema/focus-community.js";

const mockData = [
  {
    category: "Addiction",
    icon: "FaWineBottle",
    preselect: true,
    subcategories: [
      "Alcohol", "Smoking", "Vaping", "Caffeine", "Sugar", "Energy Drinks",
      "Nicotine", "Pornography", "Gambling", "Drugs", "Social Media",
      "Video Games", "Internet Addiction", "Shopping Addiction", "Chemsex",
      "Prescription Drugs",
    ],
  },
  {
    category: "Eating Habits",
    icon: "FaAppleAlt",
    preselect: true,
    subcategories: [
      "Binge Eating", "Emotional Eating", "Sugar Addiction", "Food Addiction",
      "Chewing and Spitting", "Restrictive Eating", "Overeating", "Purging",
      "Orthorexia", "Fast Food Addiction", "Junk Food Addiction",
    ],
  },
  {
    category: "Mental Health",
    icon: "FaBrain",
    preselect: true,
    subcategories: [
      "Depression", "Anxiety", "Anger Management", "OCD", "Self-Harm",
      "Suicidal Thoughts", "PTSD", "ADHD", "Bipolar Disorder", "Stress",
      "Insomnia", "Low Self-Esteem",
    ],
  },
  {
    category: "Relationships",
    icon: "FaHeart",
    preselect: false,
    subcategories: [
      "Toxic Relationships", "Codependency", "Trust Issues", "Attachment Issues",
      "Breakups", "Loneliness", "Dating Apps Addiction", "Stalking", "Jealousy",
      "Abuse",
    ],
  },
  {
    category: "Lifestyle Habits",
    icon: "SiSunrise",
    preselect: false,
    subcategories: [
      "Procrastination", "Doomscrolling", "Short-Form Videos", "Gossiping",
      "Overworking", "Excessive Exercising", "Work-Life Imbalance",
      "Knuckle Cracking", "Nail Biting", "Hair Pulling", "Skin Picking",
    ],
  },
  {
    category: "Physical Health",
    icon: "FaRunning",
    preselect: false,
    subcategories: [
      "Fitness Motivation", "Weight Loss Struggles", "Sedentary Lifestyle",
      "Injury Recovery", "Chronic Fatigue", "Overtraining", "Body Dysmorphia",
      "Muscle Imbalance",
    ],
  },
  {
    category: "Other",
    icon: "FaEllipsisH",
    preselect: false,
    subcategories: [
      "Financial Issues", "Career Burnout", "Lack of Purpose", "Parenting Struggles",
      "Addiction to AI/Tech", "Miscellaneous",
    ],
  },
];

async function seed () {
  const db = await getDbInstance()

  try {

    for (const item of mockData) {
      // Insert the parent category
      const categoryResult = await db.insert(focusCommunities).values({
        name: item.category,
        icon: item.icon,
        preselect: item.preselect,
        isCategory: true, // This is a parent category
        parentId: null, // Parent categories have null parentId
        description: `Community focused on ${item.category.toLowerCase()}-related challenges`
      }).returning({ id: focusCommunities.id });

      const categoryId = categoryResult[0].id;

      // Insert subcategories with the parent category ID
      for (const subcategory of item.subcategories) {
        await db.insert(focusCommunities).values({
          name: subcategory,
          parentId: categoryId, // Reference to the parent category
          isCategory: false, // This is a subcategory
          description: `Support community for people dealing with ${subcategory.toLowerCase()}`
        });
      }
    }

    console.log('Seed data inserted successfully!')
  } catch (error) {
    console.error('Error seeding data:', error)
  }
}

seed()
