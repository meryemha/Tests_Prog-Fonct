import setConfirmClassModifier from '../setConfirmClassModifier.js';

describe('setConfirmClassModifier', () => {
  it('should return success class when hasErrors is false', () => {
    const result = setConfirmClassModifier(false);

    expect(result).toEqual('confirm success');
  });

  it('should return disabled class when hasErrors is true', () => {
    const result = setConfirmClassModifier(true);

    expect(result).toEqual('confirm disabled');
  });

  it('should use custom classModifier if provided', () => {
    const result = setConfirmClassModifier(false, 'custom');

    expect(result).toEqual('custom success');
  });

  it('should use custom classModifier and return disabled class when hasErrors is true', () => {
    const result = setConfirmClassModifier(true, 'custom');

    expect(result).toEqual('custom disabled');
  });

  it('should default to "confirm success" when no arguments are provided', () => {
    const result = setConfirmClassModifier();

    expect(result).toEqual('confirm success');
  });
});
