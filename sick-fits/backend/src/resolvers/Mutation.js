const Mutations = {
  async createItem(parents, args, ctx, info) {
    // TODO: check if they are logged in
    const item = await ctx.db.mutation.createItem(
      {
        data: {
          title: args.title,
          description: args.description,
          price: args.price,
          image: args.image,
          largeImage: args.largeImage,
        },
      },
      info
    );
    return item;
  },
  async updateItem(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: { id: args.id },
      },
      info
    );
  },
};

module.exports = Mutations;
