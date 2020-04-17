export class CreditCardDto {
  constructor(
    public holder: string,
    public number: string,
    public expiration: string,
  ) {}
}
