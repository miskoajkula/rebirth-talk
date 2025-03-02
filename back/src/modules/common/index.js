import { eq } from "drizzle-orm";

import { users } from "#database/schema/user.js";
import { posts } from "#database/schema/post.js";
import { tags } from "#database/schema/tags.js";

class CommonModule {

  init (db) {
    this.db = db;
    this.num = Math.random();
    console.log("posts init");
  }

  async getConfig() {
    const tagResponse = await this.db.select().from(tags);
    console.log(tagResponse);

    return {
      tags: tagResponse,
    }
  }
}

export default new CommonModule();
