export class EllusionConfigForm {
  constructor(
    public confidence_level?: number,
    public min_score?: number,
    public num_samples?: number,
    public sampling?: number,
    public ellusion_name?: string,

  ) {}
}
