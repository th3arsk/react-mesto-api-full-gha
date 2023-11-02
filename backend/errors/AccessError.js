module.exports = class AccessError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
};
