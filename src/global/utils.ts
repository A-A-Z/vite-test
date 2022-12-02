export const fakeApiCall = (seconds: number): Promise<void> => new Promise(resolve => setTimeout(resolve, (seconds * 1000)))
