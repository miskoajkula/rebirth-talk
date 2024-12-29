import getDbInstance from '../index.js'

import { categoryList } from '#utils/constants.js'
import { categories } from '#database/schema/category.js'

async function seed () {
  const db = await getDbInstance()

  try {

    for (let i = 0; i < categoryList.length; i++) {
      const inserted = await db.insert(categories).values(categoryList[i]).returning()
      if (categoryList[i].subcategories?.length > 0) {
        for (let j = 0; j < categoryList[i].subcategories?.length; j++) {
          const insertedSubcategory = await db.insert(categories).values(
            {
              ...categoryList[i].subcategories[j],
              parentId: inserted[0].id,
            },
          ).returning()

          if (categoryList[i].subcategories[j].subcategories?.length > 0) {
            for (let k = 0; k < categoryList[i].subcategories[j].subcategories.length; k++) {
              await db.insert(categories).values(
                {
                  ...categoryList[i].subcategories[j].subcategories[k],
                  parentId: insertedSubcategory[0].id,
                },
              )
            }
          }
        }
      }
    }

    console.log('Seed data inserted successfully!')
  } catch (error) {
    console.error('Error seeding data:', error)
  }
}

seed()
