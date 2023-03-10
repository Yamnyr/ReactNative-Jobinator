const BASE_URL = "http://localhost:8000";

export async function fetchAllJobs(jwt) {
  return fetch(`${BASE_URL}/api/jobs`, {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((response) => response.json())

    .catch((error) => {
      console.log(error);
    });
}

export async function fetchJob(jwt, id) {
  return fetch(`${BASE_URL}/api/jobs/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((response) => response.json())

    .catch((error) => {
      console.log(error);
    });
}
