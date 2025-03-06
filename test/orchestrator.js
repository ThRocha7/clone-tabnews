import retry from "async-retry";

export default async function waitForAllServices() {
  return retry(
    async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      if (response.status !== 200) {
        throw Error();
      }
    },
    {
      retries: 100,
      maxTimeout: 1000,
    },
  );
}
