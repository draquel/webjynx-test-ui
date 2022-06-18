export const environment = {
  production: true,
  apiUrl: (window as any)["env"]["apiUrl"] || "localhost:9001",
  authUrl: (window as any)["env"]["authUrl"] || "localhost:9080",
  debug: (window as any)["env"]["debug"] || false
};

