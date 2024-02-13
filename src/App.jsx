import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLanguages, translateText } from './redux/actions/translateActions';
import Select from 'react-select';
import { setAnswer } from './redux/slices/translateSlice';

const App = () => {
  const dispatch = useDispatch();
  const languageSlice = useSelector((store) => store.languageSlice);
  const translateSlice = useSelector((store) => store.translateSlice);
  const [text, setText] = useState('');
  const [sourceLang, setSourceLang] = useState({
    value: 'tr',
    label: 'Turkish',
  });
  const [targetLang, setTargetLang] = useState({
    value: 'en',
    label: 'English',
  });

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  const languages = useMemo(
    () =>
      languageSlice.languages.map((item) => ({
        value: item.code,
        label: item.name,
      })),
    [languageSlice.languages]
  );

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);

    setText(translateSlice.answer)

    dispatch(setAnswer(text))
  };

  return (
    <div id="main-page">
      <div className="container">
        <h1>Çeviri +</h1>
        <div className="upper">
          <Select
            value={sourceLang}
            onChange={setSourceLang}
            className="select"
            options={languages}
            isLoading={languageSlice.isLoading}
            isDisabled={languageSlice.isLoading}
          />
          <button onClick={handleSwap}>Değiş</button>
          <Select
            value={targetLang}
            onChange={setTargetLang}
            className="select"
            options={languages}
            isLoading={languageSlice.isLoading}
            isDisabled={languageSlice.isLoading}
          />
        </div>

        <div className="middle">
          <div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <div>
            <textarea disabled value={translateSlice.answer} />
            {translateSlice.isLoading && (
              <div className="wrapper">
                <div className="typewriter">
                  <div className="slide">
                    <i></i>
                  </div>
                  <div className="paper"></div>
                  <div className="keyboard"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() =>
            dispatch(translateText({ text, sourceLang, targetLang }))
          }
        >
          Çevir
        </button>
      </div>
    </div>
  );
};

export default App;
