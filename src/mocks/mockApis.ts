const mockDeleteApi = jest.fn((succsesOrNot: string, message: string) => {
  Promise.resolve({
    json: () => Promise.resolve({ succsesOrNot, message }),
  });
});

export { mockDeleteApi };
