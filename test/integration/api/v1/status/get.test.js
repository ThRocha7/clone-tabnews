import orchestrator from "test/orchestrator.js";

beforeAll(async () => {
  await orchestrator();
});

test("GET to api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  const parsingDate = new Date(responseBody.update_at).toISOString();

  expect(responseBody.update_at).toBeDefined();
  expect(responseBody.update_at).toEqual(parsingDate);
  expect(responseBody.dependecies.database.version).toBe("16.0");
  expect(responseBody.dependecies.database.max_connections).toBe(100);
  expect(responseBody.dependecies.database.opened_connections).toBe(1);
});
