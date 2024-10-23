import { graphql, HttpResponse } from "msw";

export const handlers = [
  graphql.query("GetUser", ({ variables }) => {
    const { userId } = variables;

    return HttpResponse.json({
      data: {
        user: {
          userId,
          name: "John",
        },
      },
    });
  }),
];
