import style from "../../style/loaderStyle/loader.module.css"

const Loader = () => {
  return (
    <div className={style.loaderContainer}>
      <div className={style.loader}></div>
    </div>
  );
};

export default Loader;
