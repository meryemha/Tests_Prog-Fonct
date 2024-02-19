import { buildResponse } from '../buildResponse.js';
import { computeDataError } from '../computeDataError.js';
import { STATUS_API } from '../setResponseError.js';

// Mock the necessary dependencies
jest.mock('../computeDataError.js');
jest.mock('../setResponseError.js');

describe('buildResponse', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should throw an error for ERROR status', async () => {
    const response = { status: STATUS_API.ERROR };
    const config = {};
    computeDataError.mockResolvedValue('errorData');

    await expect(buildResponse(response, config)).rejects.toEqual('errorData');
    expect(computeDataError).toHaveBeenCalledWith(response);
  });

  it('should throw an error for WARNING status', async () => {
    const response = { status: STATUS_API.WARNING };
    const config = {};
    computeDataError.mockResolvedValue('warningData');

    await expect(buildResponse(response, config)).rejects.toEqual('warningData');
    expect(computeDataError).toHaveBeenCalledWith(response);
  });

  it('should return blob for SUCCESS status with config.blob', async () => {
    const response = { status: STATUS_API.SUCCESS };
    const config = { blob: true };
    response.blob = jest.fn().mockResolvedValue('blobData');

    const result = await buildResponse(response, config);

    expect(result).toEqual('blobData');
    expect(response.blob).toHaveBeenCalled();
    expect(computeDataError).not.toHaveBeenCalled();
  });

  it('should return text for SUCCESS status with config.text', async () => {
    const response = { status: STATUS_API.SUCCESS };
    const config = { text: true };
    response.text = jest.fn().mockResolvedValue('textData');

    const result = await buildResponse(response, config);

    expect(result).toEqual('textData');
    expect(response.text).toHaveBeenCalled();
    expect(computeDataError).not.toHaveBeenCalled();
  });

  it('should return JSON object for SUCCESS status without config.blob or config.text', async () => {
    const response = { status: STATUS_API.SUCCESS, json: jest.fn().mockResolvedValue('jsonData') };
    const config = {};

    const result = await buildResponse(response, config);

    expect(result).toEqual({ ...('jsonData'), statusHttp: STATUS_API.SUCCESS });
    expect(response.json).toHaveBeenCalled();
    expect(computeDataError).not.toHaveBeenCalled();
  });

  it('should return statusHttp for unknown status', () => {
    const response = { status: 'unknownStatus' };
    const config = {};

    const result = buildResponse(response, config);

    expect(result).toEqual({ statusHttp: 'unknownStatus' });
    expect(computeDataError).not.toHaveBeenCalled();
  });
});
