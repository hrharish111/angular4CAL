import {FormControl, Validators} from '@angular/forms';

export class FormdataDetails {
  constructor(
    public index_name?: string,
    public cal_index?: string,
    public extra_sample?: number,
  ) {}
}
