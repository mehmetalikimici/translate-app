import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { options } from '../../constant';

export const getLanguages = createAsyncThunk(
  'language/getLanguages',
  async () => {
    const res = await axios.request(options);

    return res.data.data.languages;
  }
);

export const translateText = createAsyncThunk(
  'language/text',
  async ({ text, sourceLang, targetLang }) => {

    const params = new URLSearchParams();
    params.set('source_language', sourceLang.value);
    params.set('target_language', targetLang.value);
    params.set('text', text);

    const options = {
      method: 'POST',
      url: 'https://text-translator2.p.rapidapi.com/translate',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'f9c207ba31msh4c2b93a87d02f09p1e9192jsn80446e7d1bc9',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
      },
      data: params,
    };

    const res = await axios.request(options)

    return res.data.data.translatedText;
  }
);
