import { Position, RectangleRange } from './layout';

export interface Bookmark {
  elem_id: string;
  elem_type: string;
  elem_pos?: Position;
  comment: string;
  viewport: RectangleRange;
}
