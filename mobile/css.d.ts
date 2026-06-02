// Metro/Expo resolves CSS imports at bundle time; declare them so standalone `tsc` is clean too.
declare module '*.css';
declare module '*.module.css' {
  const styles: { readonly [key: string]: string };
  export default styles;
}
