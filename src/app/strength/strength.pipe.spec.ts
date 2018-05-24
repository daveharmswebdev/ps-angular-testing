import { StrengthPipe } from "./strength.pipe";

describe('strength pipe', () => {
  it('should display weak if strength is 5', () => {
    const pipe = new StrengthPipe();

    const expected = pipe.transform(5);

    expect(expected).toEqual('5 (weak)')
  })

  it('should display strong if strength is 10', () => {
    const pipe = new StrengthPipe();

    const expected = pipe.transform(10);

    expect(expected).toEqual('10 (strong)')
  })

  it('should display strong if strength is 21', () => {
    const pipe = new StrengthPipe();

    const expected = pipe.transform(21);

    expect(expected).toEqual('21 (unbelievable)')
  })
})
