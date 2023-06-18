import { useEffect } from "react"

const Preloader = () => {
  useEffect(() => console.log("mounted"), []);
  
  return <div>loading...</div>;
};

export default Preloader;
