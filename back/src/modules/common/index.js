import { eq } from "drizzle-orm";

import { users } from "#database/schema/user.js";
import { posts } from "#database/schema/post.js";
import { tags } from "#database/schema/tags.js";
import { focusCommunities } from "#database/schema/focus-community.js";

class CommonModule {

  init (db) {
    this.db = db;
    this.num = Math.random();
    console.log("posts init");
  }

  async getFocusCommunities() {
    const allCommunities = await this.db.select().from(focusCommunities);
    const categories = allCommunities.filter(community => community.isCategory);

    return categories.map(category => {
      const subcategories = allCommunities
      .filter(item => item.parentId === category.id)
      .map(item => { return { name: item.name, id: item.id }; });

      return {
        id: category.id,
        category: category.name,
        icon: category.icon || '',
        preselect: category.preselect || false,
        subcategories
      };
    });
  }

  async getConfig() {
    const tagResponse = await this.db.select().from(tags);
    const communities = await this.getFocusCommunities()

    return {
      tags: tagResponse,
      communities: communities,
    }
  }
}

export default new CommonModule();
