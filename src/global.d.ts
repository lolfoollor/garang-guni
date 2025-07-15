/// <reference types="redux-persist" />
/// <reference types="vite/client" />

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.json" {
  const value: any;
  export default value;
}

declare module "*.css";

declare module "*.jpg";

declare module "*.png";
