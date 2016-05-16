export default class Score {

  constructor(initialScore = 0) {
    this._points = initialScore;
  }

  addPoints(points) {
    this._points = this._points + points;
  }

  get points() {
    return this._points;
  }

}
