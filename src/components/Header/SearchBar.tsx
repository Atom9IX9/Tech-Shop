import style from "style/headerStyle/headerStyle.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { BiMicrophone } from "react-icons/bi";
import cn from "classnames";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FormEventHandler, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const { t, i18n } = useTranslation("header");

  const [searchParams, setSearchParams] = useSearchParams();

  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const startSpeech = () => {
    SpeechRecognition.startListening({
      language: i18n.language === "ua" ? "ru" : i18n.language,
    });
  };

  useEffect(() => {
    setValue(transcript);
  }, [transcript]);

  useEffect(() => {
    const paramsValue = searchParams.get("query") || ""
    if (!paramsValue) {
      setSearchParams({});
    }
    setValue(paramsValue);
  }, [searchParams, setSearchParams]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!value) {
      setSearchParams({});
    } else {
      setSearchParams({ query: value });
    }
  };

  return (
    <form onSubmit={onSubmit} className={style.searchForm}>
      <div className={style.searchBarContainer}>
        <AiOutlineSearch size={23} color="#4c4c4c" />
        <input
          className={style.searchBar}
          placeholder={t("searchPlaceholder") as string}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {browserSupportsSpeechRecognition &&
          (!listening ? (
            <BiMicrophone
              size={23}
              className={style.microphoneIcon}
              onClick={startSpeech}
            />
          ) : (
            <div className={style.activeMicrophoneIcon}>
              <span
                className={cn(style.dot, { [style.dot1]: listening })}
              ></span>
              <span
                className={cn(style.dot, { [style.dot2]: listening })}
              ></span>
              <span
                className={cn(style.dot, { [style.dot3]: listening })}
              ></span>
            </div>
          ))}
      </div>
      <button type="submit" className={style.searchBtn}>
        {t("search")}
      </button>
    </form>
  );
};

export default SearchBar;
