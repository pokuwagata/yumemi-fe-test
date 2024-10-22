import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch("https://local.api.yumemi-fe-test.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        query GetUser($userId: String!) {
          user(id: $userId) {
            name
          }
        }
        `,
        variables: { userId: 1 },
      }),
    }).then(async (response) => {
      console.log(await response.json());
    });
  }, []);
  return <p>test</p>;
}
