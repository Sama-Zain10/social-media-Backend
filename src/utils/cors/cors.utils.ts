import { WHITE_LIST } from './../../config/config.service';
import { CorsOptions } from 'cors';
const Whit_list: string[] = WHITE_LIST;

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return  callback(null, true);

    if (Whit_list.includes(origin!)) return callback(null, true);

      return callback(new Error('Not allowed by CORS'));
  },
};