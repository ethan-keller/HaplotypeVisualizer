import { RectangleRange } from './layout';

export interface Bookmark {
  elem_id: string;
  elem_type: string;
  comment: string;
  viewport: RectangleRange;
}
