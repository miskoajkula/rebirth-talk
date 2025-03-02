import { eq } from "drizzle-orm";

import { users } from "#database/schema/user.js";
import { posts } from "#database/schema/post.js";

class PostsModule {

  init (db) {
    this.db = db;
    this.num = Math.random();
    console.log("posts init");
  }

  async create({ user, post }) {

  }

  async getPostsByUsername ({ username, offset, limit = 10 }) {
    console.log(`username ${username} is ${limit}`);
    const userPosts = await this.db.select().
      from(posts).
      innerJoin(users, eq(posts.userId, users.id)).
      where(eq(users.username, username)).
      limit(limit).
      offset(offset).
      execute();

    console.log(userPosts);

  }
}

export default new PostsModule();
