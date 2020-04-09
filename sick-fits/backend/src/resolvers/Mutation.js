const Mutations = {
  async createItem(parents, args, ctx, info) {
    // TODO: check if they are logged in
    console.log(args);
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
};

module.exports = Mutations;
