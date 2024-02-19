import { setPagination } from '../setPagination.js';

// Mock the necessary dependencies
jest.mock('../setCurrentPage.js');
jest.mock('../setNumberPages.js');

describe('setPagination', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should calculate pagination values correctly', () => {
    // Mock setCurrentPage to return 2
    setCurrentPage.mockReturnValue();

    // Mock setNumberPages to return 5
    setNumberPages.mockReturnValue();

    const result = setPagination({
      total: 50,
      skip: 10,
      max: 10,
    });

    // Expectations
    expect(result.total).toEqual(50);
    expect(result.numberItems).toEqual(10);
    expect(result.numberPages).toEqual(5);
    expect(result.currentPage).toEqual(2);

    // Verify mock calls
    expect(setCurrentPage).toHaveBeenCalledWith({ max: 10, skip: 10 });
    expect(setNumberPages).toHaveBeenCalledWith({ total: 50, max: 10 });
  });

  it('should use default values when not provided', () => {
    // Mock setCurrentPage to return 1
    setCurrentPage.mockReturnValue(1);

    // Mock setNumberPages to return 1
    setNumberPages.mockReturnValue(1);

    const result = setPagination({});

    // Expectations
    expect(result.total).toEqual(1);
    expect(result.numberItems).toEqual(1);
    expect(result.numberPages).toEqual(1);
    expect(result.currentPage).toEqual(1);

    // Verify mock calls
    expect(setCurrentPage).toHaveBeenCalledWith({ max: 1, skip: 1 });
    expect(setNumberPages).toHaveBeenCalledWith({ total: 1, max: 1 });
  });
});
