import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("research", "routes/research.tsx"),
  route("team", "routes/team.tsx"),
  route("publications", "routes/publications.tsx"),
  route("news", "routes/news._index.tsx"),
  route("news/:slug", "routes/news.$slug.tsx"),
  route("join-us", "routes/join-us.tsx"),
  route("contact", "routes/contact.tsx"),
] satisfies RouteConfig;
