import { HttpMethod, type Route } from "@floq/floq";

const simpleTask: Route = {
  path: "/app",
  method: HttpMethod.GET,
  name: "app",
  task: () => {
    console.log("Hello world from app");
  },
  children: [
    {
      name: "home",
      path: "home",
      method: HttpMethod.GET,
      task: () => {
        console.log("Hello world from home path");
      },
    },
    {
      name: "barista",
      path: "barista",
      method: HttpMethod.GET,
      task: () => {
        console.log("Hello world from barista");
      },
    },
  ],
};

export default simpleTask;